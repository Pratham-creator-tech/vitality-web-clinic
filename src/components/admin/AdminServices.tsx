
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const AdminServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock service data
  const services = [
    { 
      id: 1, 
      name: "Sports Rehabilitation", 
      price: 120,
      duration: 60,
      category: "Rehabilitation",
      status: "active"
    },
    { 
      id: 2, 
      name: "Manual Therapy", 
      price: 100,
      duration: 45,
      category: "Therapy",
      status: "active"
    },
    { 
      id: 3, 
      name: "Neurological Rehabilitation", 
      price: 150,
      duration: 90,
      category: "Rehabilitation",
      status: "active"
    },
    { 
      id: 4, 
      name: "Pediatric Rehabilitation", 
      price: 130,
      duration: 60,
      category: "Rehabilitation",
      status: "inactive"
    },
    { 
      id: 5, 
      name: "Geriatric Rehabilitation", 
      price: 110,
      duration: 45,
      category: "Rehabilitation",
      status: "active"
    },
    { 
      id: 6, 
      name: "Dry Needling", 
      price: 85,
      duration: 30,
      category: "Therapy",
      status: "active"
    },
  ];
  
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadgeColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Services Management</CardTitle>
        <CardDescription>Manage clinic services, prices and availability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </Button>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>{service.duration} min</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusBadgeColor(service.status)}`}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit service</DropdownMenuItem>
                          <DropdownMenuItem>Update pricing</DropdownMenuItem>
                          <DropdownMenuItem>View bookings</DropdownMenuItem>
                          {service.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No services found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
