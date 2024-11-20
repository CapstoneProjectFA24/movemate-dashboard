"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import { ChevronDown, Plus, Users, Moon, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Team {
  id: string;
  name: string;
  color: string;
}

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  teamId: string;
  shiftId: string;
}

const WorkScheduleCalendar = () => {
  const [teams] = useState<Team[]>([
    { id: '1', name: 'Tổ 1', color: '#67e8f9' },
    { id: '2', name: 'Tổ 2', color: '#e879f9' },
  ]);

  const [selectedTeams, setSelectedTeams] = useState<string[]>(['1']);
  const [selectedShift, setSelectedShift] = useState<string>('ca-1');
  const [view, setView] = useState<'timeGridWeek' | 'dayGridMonth' | 'timeGridDay'>('timeGridWeek');
  const [darkMode, setDarkMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState<string | null>(null);
  const [selectedTeamForEvent, setSelectedTeamForEvent] = useState<string>('');
  const [selectedShiftForEvent, setSelectedShiftForEvent] = useState<string>('');
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  const shifts: Shift[] = [
    { id: 'ca-1', name: 'Ca 1: 7h - 12h', startTime: '07:00', endTime: '12:00' },
    { id: 'ca-2', name: 'Ca 2: 12h - 17h', startTime: '12:00', endTime: '17:00' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDateSelect = (selectInfo: any) => {
    setNewEventDate(selectInfo.startStr.split('T')[0]);
    setIsDialogOpen(true);
  };

  const handleAddSchedule = () => {
    if (!newEventDate || !selectedTeamForEvent || !selectedShiftForEvent) return;

    const selectedShiftDetails = shifts.find(s => s.id === selectedShiftForEvent);
    const selectedTeamDetails = teams.find(t => t.id === selectedTeamForEvent);

    if (!selectedShiftDetails || !selectedTeamDetails) return;

    const newEvent: ScheduleEvent = {
      id: `${Date.now()}`,
      title: selectedTeamDetails.name,
      start: `${newEventDate}T${selectedShiftDetails.startTime}:00`,
      end: `${newEventDate}T${selectedShiftDetails.endTime}:00`,
      backgroundColor: selectedTeamDetails.color,
      borderColor: selectedTeamDetails.color,
      teamId: selectedTeamDetails.id,
      shiftId: selectedShiftDetails.id,
    };

    setEvents([...events, newEvent]);
    setIsDialogOpen(false);
    setNewEventDate(null);
    setSelectedTeamForEvent('');
    setSelectedShiftForEvent('');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 p-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Shift Selection */}
          <div className="relative">
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700 dark:text-gray-200"
            >
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
          </div>

          {/* Team Selection */}
          <div className="flex gap-2 items-center">
            <Users className="w-5 h-5 text-gray-500" />
            {teams.map((team) => (
              <label
                key={team.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTeams.includes(team.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTeams([...selectedTeams, team.id]);
                    } else {
                      setSelectedTeams(selectedTeams.filter((id) => id !== team.id));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: team.color }}
                >
                  {team.name}
                </span>
              </label>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setView('dayGridMonth')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'dayGridMonth'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              Tháng
            </button>
            <button
              onClick={() => setView('timeGridWeek')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'timeGridWeek'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              Tuần
            </button>
            <button
              onClick={() => setView('timeGridDay')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'timeGridDay'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              Ngày
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            locale={viLocale}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            events={events.filter((event) =>
              selectedTeams.includes(event.teamId)
            )}
            slotMinTime="04:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            height="auto"
            expandRows={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            nowIndicator={true}
            slotDuration="00:30:00"
            slotLabelInterval="01:00"
            select={handleDateSelect}
          />
        </div>

        {/* Add Schedule Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>Thêm lịch làm việc mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Chọn tổ</label>
                <Select value={selectedTeamForEvent} onValueChange={setSelectedTeamForEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tổ" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chọn ca</label>
                <Select value={selectedShiftForEvent} onValueChange={setSelectedShiftForEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ca" />
                  </SelectTrigger>
                  <SelectContent>
                    {shifts.map((shift) => (
                      <SelectItem key={shift.id} value={shift.id}>
                        {shift.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddSchedule}>
                  Thêm lịch
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Schedule Button */}
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default WorkScheduleCalendar;