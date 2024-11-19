"use client";

import React, { useState } from 'react';
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
    BarChart3
} from 'lucide-react';

const ExceptionDashboard: React.FC = () => {
    const [selectedShift, setSelectedShift] = useState('all');
    
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
            createdAt: "19/03/2024 10:30",
            type: "Thiếu Tài Xế",
            status: "Đang Chờ",
            phone: "0921029392",
            customer: "Nguyễn Văn A",
        },
    ];

    // Mock data for staff
    const mockDrivers = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            role: "Tài Xế",
            rating: 4.8,
            phone: "0987654321",
            status: "Sẵn Sàng",
            shift: "Ca 1"
        },
        {
            id: 2,
            name: "Trần Văn B",
            role: "Tài Xế",
            rating: 4.5,
            phone: "0987654322",
            status: "Sẵn Sàng",
            shift: "Ca 2"
        },
    ];

    const mockPorters = [
        {
            id: 3,
            name: "Lê Văn C",
            role: "Nhân viên bốc xếp",
            rating: 4.6,
            phone: "0987654323",
            status: "Sẵn Sàng",
            shift: "Ca 1"
        },
    ];

    const mockEvaluators = [
        {
            id: 4,
            name: "Phạm Thị D",
            role: "Nhân viên đánh giá",
            rating: 4.9,
            phone: "0987654324",
            status: "Sẵn Sàng",
            shift: "Ca 2"
        },
    ];

    const mockChartData = [
        { name: '10:00', noDriver: 4, noPorter: 2 },
        { name: '11:00', noDriver: 6, noPorter: 3 },
        { name: '12:00', noDriver: 8, noPorter: 4 },
    ];

    const filterByShift = (staff: any) => {
        if (selectedShift === 'all') return true;
        return staff.shift === selectedShift;
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
                    {data.filter(filterByShift).map((staff) => (
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
                                    <TableHead>Thời Gian Tạo</TableHead>
                                    <TableHead>Loại</TableHead>
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
                                        <TableCell>{request.createdAt}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{request.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{request.status}</Badge>
                                        </TableCell>
                                        <TableCell>{request.phone}</TableCell>
                                        <TableCell>{request.customer}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">Phân Công</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Nhân Viên Sẵn Sàng
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
                            <Select 
                                value={selectedShift}
                                onValueChange={setSelectedShift}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Chọn ca" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả ca</SelectItem>
                                    <SelectItem value="Ca 1">Ca 1 (6:00 - 14:00)</SelectItem>
                                    <SelectItem value="Ca 2">Ca 2 (14:00 - 22:00)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Tabs defaultValue="drivers" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="drivers">Tài Xế</TabsTrigger>
                                <TabsTrigger value="porters">Nhân Viên Bốc Xếp</TabsTrigger>
                                <TabsTrigger value="evaluators">Nhân Viên Đánh Giá</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="drivers">
                                <StaffTable data={mockDrivers} />
                            </TabsContent>
                            
                            <TabsContent value="porters">
                                <StaffTable data={mockPorters} />
                            </TabsContent>
                            
                            <TabsContent value="evaluators">
                                <StaffTable data={mockEvaluators} />
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