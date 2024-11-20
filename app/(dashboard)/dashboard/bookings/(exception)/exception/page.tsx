"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    Clock,
    AlertTriangle,
    Users,
    Filter,
    Search,
    BarChart3,
    Wand2
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const ExceptionDashboard: React.FC = () => {
    const [selectedShift, setSelectedShift] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
    const [selectedBookingTime, setSelectedBookingTime] = useState<string | null>(null);
    const staffSectionRef = useRef<HTMLDivElement>(null);

    const checkAvailableStaff = (request: any) => {
        const [hour] = request.bookingAt.split(' ')[1].split(':').map(Number);
        const requestShift = getShiftByHour(hour);
        
        const availableDrivers = mockDrivers.filter(driver => 
            driver.shift === requestShift && 
            driver.availableTime === request.bookingAt.split(' ')[1]
        );
        
        const availablePorters = mockPorters.filter(porter => 
            porter.shift === requestShift && 
            porter.availableTime === request.bookingAt.split(' ')[1]
        );

        if (request.type.includes("Tài Xế")) {
            return availableDrivers.length > 0;
        } else if (request.type.includes("Bốc Xếp")) {
            return availablePorters.length > 0;
        }
        return false;
    };

    const handleAutoAssign = (request: any) => {
        const [hour] = request.bookingAt.split(' ')[1].split(':').map(Number);
        const requestShift = getShiftByHour(hour);
        
        if (request.type.includes("Tài Xế")) {
            const availableDriver = mockDrivers.find(driver => 
                driver.shift === requestShift && 
                driver.availableTime === request.bookingAt.split(' ')[1]
            );
            
            if (availableDriver) {
                toast({
                    title: "Phân công thành công",
                    description: `Đã phân công tài xế ${availableDriver.name} cho booking ${request.id}`,
                });
                return;
            }
        } else if (request.type.includes("Bốc Xếp")) {
            const availablePorter = mockPorters.find(porter => 
                porter.shift === requestShift && 
                porter.availableTime === request.bookingAt.split(' ')[1]
            );
            
            if (availablePorter) {
                toast({
                    title: "Phân công thành công",
                    description: `Đã phân công nhân viên bốc xếp ${availablePorter.name} cho booking ${request.id}`,
                });
                return;
            }
        }
        
        toast({
            variant: "destructive",
            title: "Không thể phân công",
            description: "Không tìm thấy nhân viên phù hợp cho thời gian này",
        });
    };

    const SHIFTS = {
        EARLY: 'Ca Sớm',
        SHIFT_1: 'Ca 1',
        SHIFT_2: 'Ca 2',
        LATE: 'Ca Muộn'
    };

    const getShiftByHour = (hour: number): string => {
        if (hour >= 4 && hour < 7) return SHIFTS.EARLY;
        if (hour >= 7 && hour < 12) return SHIFTS.SHIFT_1;
        if (hour >= 12 && hour < 17) return SHIFTS.SHIFT_2;
        if (hour >= 17 && hour < 22) return SHIFTS.LATE;
        return 'Ngoài giờ làm việc';
    };

    const mockStats = {
        unassigned: 12,
        exceptions: {
            noDriver: 8,
            noPorter: 4
        },
        avgWaitTime: "15 phút"
    };

    const mockRequests = [
        {
            id: "BOK001",
            bookingAt: "19/03/2024 10:30",
            type: "Thiếu Tài Xế",
            status: "Đang Chờ",
            phone: "0921029392",
            sl: "1",
            customer: "Nguyễn Văn A",
        },
        {
            id: "BOK002",
            bookingAt: "19/03/2024 15:30",
            type: "Thiếu Nhân Viên Bốc Xếp",
            status: "Đang Chờ",
            phone: "0921029393",
            sl: "2",
            customer: "Trần Văn B",
        },
        {
            id: "BOK003",
            bookingAt: "19/03/2024 20:30",
            type: "Thiếu Tài Xế",
            status: "Đang Chờ",
            phone: "0921029394",
            sl: "1",
            customer: "Phạm Văn C",
        }
    ];

    const mockDrivers = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            role: "Tài Xế",
            rating: 4.8,
            phone: "0987654321",
            status: "Sẵn Sàng",
            shift: SHIFTS.EARLY,
            availableTime: "05:30"
        },
        {
            id: 2,
            name: "Trần Văn B",
            role: "Tài Xế",
            rating: 4.5,
            phone: "0987654322",
            status: "Sẵn Sàng",
            shift: SHIFTS.SHIFT_2,
            availableTime: "15:30"
        },
        {
            id: 3,
            name: "Lê Văn D",
            role: "Tài Xế",
            rating: 4.7,
            phone: "0987654324",
            status: "Sẵn Sàng",
            shift: SHIFTS.LATE,
            availableTime: "20:30"
        }
    ];

    const mockPorters = [
        {
            id: 4,
            name: "Lê Văn C",
            role: "Nhân viên bốc xếp",
            rating: 4.6,
            phone: "0987654323",
            status: "Sẵn Sàng",
            shift: SHIFTS.EARLY,
            availableTime: "05:30"
        },
        {
            id: 5,
            name: "Trần Văn E",
            role: "Nhân viên bốc xếp",
            rating: 4.4,
            phone: "0987654325",
            status: "Sẵn Sàng",
            shift: SHIFTS.LATE,
            availableTime: "20:30"
        }
    ];

    const mockEvaluators = [
        {
            id: 4,
            name: "Phạm Thị D",
            role: "Nhân viên đánh giá",
            rating: 4.9,
            phone: "0987654324",
            status: "Sẵn Sàng",
            shift: "Ca 2",
            availableTime: "15:30"
        },
    ];

    const mockChartData = [
        { name: '10:00', noDriver: 4, noPorter: 2 },
        { name: '11:00', noDriver: 6, noPorter: 3 },
        { name: '12:00', noDriver: 8, noPorter: 4 },
    ];

    const handleBookingTimeClick = (request: any) => {
        const [hour, minute] = request.bookingAt.split(' ')[1].split(':').map(Number);
        const shift = getShiftByHour(hour);

        setSelectedBookingTime(request.bookingAt);
        setSelectedShift(shift);

        const defaultTab = request.type.includes("Tài Xế") ? "drivers" : "porters";

        if (staffSectionRef.current) {
            staffSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filterStaff = (staff: any) => {
        if (selectedBookingTime) {
            const [bookingHour, bookingMinute] = selectedBookingTime.split(' ')[1].split(':').map(Number);
            const requestShift = getShiftByHour(bookingHour);

            if (staff.shift !== requestShift) {
                return false;
            }

            if (staff.availableTime !== selectedBookingTime.split(' ')[1]) {
                return false;
            }

            return true;
        }

        if (selectedShift !== 'all') {
            return staff.shift === selectedShift;
        }

        return true;
    };

    const ShiftStatusBadge: React.FC<{ bookingTime: string }> = ({ bookingTime }) => {
        const [hour] = bookingTime.split(':').map(Number);
        const shift = getShiftByHour(hour);
        let color = 'bg-gray-100';

        switch (shift) {
            case SHIFTS.EARLY:
                color = 'bg-purple-100 text-purple-800';
                break;
            case SHIFTS.SHIFT_1:
                color = 'bg-blue-100 text-blue-800';
                break;
            case SHIFTS.SHIFT_2:
                color = 'bg-green-100 text-green-800';
                break;
            case SHIFTS.LATE:
                color = 'bg-orange-100 text-orange-800';
                break;
        }

        return (
            <Badge variant="outline" className={color}>
                {shift}
            </Badge>
        );
    };

    const StaffTable: React.FC<{ data: any[] }> = ({ data }) => (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Vai Trò</TableHead>
                        <TableHead>Đánh Giá</TableHead>
                        <TableHead>Số điện thoại</TableHead>
                        <TableHead>Ca làm việc</TableHead>
                        <TableHead>Trạng Thái</TableHead>
                        <TableHead>Thao Tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.filter(filterStaff).map((staff) => (
                        <TableRow key={staff.id}>
                            <TableCell>{staff.name}</TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>{staff.rating}</TableCell>
                            <TableCell>{staff.phone}</TableCell>
                            <TableCell>{staff.shift}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-green-50">
                                    {staff.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">Chọn</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Yêu Cầu Chưa Phân Công
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.unassigned}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Loại Ngoại Lệ
                        </CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm">Thiếu Tài Xế: {mockStats.exceptions.noDriver}</div>
                            <div className="text-sm">Thiếu Nhân Viên Bốc Xếp: {mockStats.exceptions.noPorter}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Thời Gian Chờ TB
                        </CardTitle>
                        <Clock className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.avgWaitTime}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Bộ Lọc
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Tất Cả Ngoại Lệ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất Cả Ngoại Lệ</SelectItem>
                                <SelectItem value="noDriver">Thiếu Tài Xế</SelectItem>
                                <SelectItem value="noPorter">Thiếu Nhân Viên Bốc Xếp</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input type="date" className="w-full" />
                        <Select
                            value={selectedShift}
                            onValueChange={setSelectedShift}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn ca" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả ca</SelectItem>
                                <SelectItem value={SHIFTS.EARLY}>Ca Sớm (4:00 - 7:00)</SelectItem>
                                <SelectItem value={SHIFTS.SHIFT_1}>Ca 1 (7:00 - 14:00)</SelectItem>
                                <SelectItem value={SHIFTS.SHIFT_2}>Ca 2 (14:00 - 17:00)</SelectItem>
                                <SelectItem value={SHIFTS.LATE}>Ca Muộn (17:00 - 22:00)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Yêu Cầu Đang Chờ
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mã Yêu Cầu</TableHead>
                                    <TableHead>Thời Gian Vận Chuyển</TableHead>
                                    <TableHead>Loại</TableHead>
                                    <TableHead>Số lượng</TableHead>
                                    <TableHead>Trạng Thái</TableHead>
                                    <TableHead>Số điện thoại</TableHead>
                                    <TableHead>Khách Hàng</TableHead>
                                    <TableHead>Thao Tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockRequests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.id}</TableCell>
                                        <TableCell
                                            className="cursor-pointer hover:text-blue-500"
                                            onClick={() => handleBookingTimeClick(request)}
                                        >
                                            {request.bookingAt}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{request.type}</Badge>
                                        </TableCell>
                                        <TableCell>{request.sl}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{request.status}</Badge>
                                        </TableCell>
                                        <TableCell>{request.phone}</TableCell>
                                        <TableCell>{request.customer}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">Phân Công</Button>
                                                {checkAvailableStaff(request) && (
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="text-green-600 hover:text-green-700"
                                                        onClick={() => handleAutoAssign(request)}
                                                    >
                                                        <Wand2 className="h-4 w-4 mr-1" />
                                                        Tự động
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card ref={staffSectionRef}>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Nhân Viên Sẵn Sàng
                        {selectedBookingTime && (
                            <Badge variant="secondary">
                                Lọc theo thời gian: {selectedBookingTime}
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-2 justify-between">
                            <div className="flex gap-2">
                                <Input placeholder="Tìm kiếm nhân viên..." className="max-w-sm" />
                                <Button variant="outline">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Select
                                    value={selectedShift}
                                    onValueChange={setSelectedShift}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Chọn ca" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả ca</SelectItem>
                                        <SelectItem value={SHIFTS.EARLY}>Ca Sớm (4:00 - 7:00)</SelectItem>
                                        <SelectItem value={SHIFTS.SHIFT_1}>Ca 1 (7:00 - 14:00)</SelectItem>
                                        <SelectItem value={SHIFTS.SHIFT_2}>Ca 2 (14:00 - 17:00)</SelectItem>
                                        <SelectItem value={SHIFTS.LATE}>Ca Muộn (17:00 - 22:00)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {selectedBookingTime && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedBookingTime(null);
                                            setSelectedShift('all');
                                        }}
                                    >
                                        Xóa bộ lọc
                                    </Button>
                                )}
                            </div>
                        </div>

                        <Tabs defaultValue="drivers" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="drivers">Tài Xế</TabsTrigger>
                                <TabsTrigger value="porters">Nhân Viên Bốc Xếp</TabsTrigger>
                                <TabsTrigger value="evaluators">Nhân Viên Đánh Giá</TabsTrigger>
                            </TabsList>

                            <TabsContent value="drivers">
                                <StaffTable data={mockDrivers} />
                                {mockDrivers.filter(filterStaff).length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        Không có tài xế phù hợp với thời gian đã chọn
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="porters">
                                <StaffTable data={mockPorters} />
                                {mockPorters.filter(filterStaff).length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        Không có nhân viên bốc xếp phù hợp với thời gian đã chọn
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="evaluators">
                                <StaffTable data={mockEvaluators} />
                                {mockEvaluators.filter(filterStaff).length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        Không có nhân viên đánh giá phù hợp với thời gian đã chọn
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Theo Dõi Thống Kê
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="noDriver"
                                    stroke="#8884d8"
                                    name="Thiếu Tài Xế"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="noPorter"
                                    stroke="#82ca9d"
                                    name="Thiếu Nhân Viên Bốc Xếp"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExceptionDashboard;