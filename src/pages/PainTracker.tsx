
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Save, LineChart, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CartesianGrid, 
  Line, 
  LineChart as Chart, 
  ResponsiveContainer, 
  Tooltip as ChartTooltip, 
  XAxis, 
  YAxis 
} from "recharts";

type PainEntry = {
  id: string;
  date: Date;
  bodyPart: string;
  painLevel: number;
  painType: string;
  notes: string;
};

const bodyPartOptions = [
  "Neck",
  "Shoulders",
  "Upper Back",
  "Lower Back",
  "Elbows",
  "Wrists",
  "Hands",
  "Hips",
  "Knees",
  "Ankles",
  "Feet",
  "Head",
  "Other",
];

const painTypeOptions = [
  "Sharp",
  "Dull",
  "Throbbing",
  "Burning",
  "Shooting",
  "Tingling",
  "Stiff",
  "Aching",
];

const PainTracker = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [bodyPart, setBodyPart] = useState<string>("");
  const [painLevel, setPainLevel] = useState<number>(0);
  const [painType, setPainType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [activeTab, setActiveTab] = useState<string>("new-entry");

  const handleSaveEntry = () => {
    if (!bodyPart || !painType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newEntry: PainEntry = {
      id: Date.now().toString(),
      date,
      bodyPart,
      painLevel,
      painType,
      notes,
    };

    setEntries([...entries, newEntry]);
    toast.success("Pain entry saved successfully");

    // Reset form
    setPainLevel(0);
    setBodyPart("");
    setPainType("");
    setNotes("");
    setDate(new Date());
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast.info("Entry deleted");
  };

  const getChartData = () => {
    // Sort entries by date
    const sortedEntries = [...entries].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    return sortedEntries.map((entry) => ({
      date: format(entry.date, "MMM d"),
      painLevel: entry.painLevel,
      bodyPart: entry.bodyPart,
    }));
  };

  const getBodyPartData = (part: string) => {
    return entries
      .filter((entry) => entry.bodyPart === part)
      .map((entry) => ({
        date: format(entry.date, "MMM d"),
        painLevel: entry.painLevel,
      }));
  };

  const uniqueBodyParts = [...new Set(entries.map((entry) => entry.bodyPart))];

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle
          title="Pain Tracker Tool"
          subtitle="Monitor your pain levels and track improvements over time"
          center
        />

        <div className="mt-12">
          <Tabs
            defaultValue="new-entry"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full max-w-[600px] grid-cols-3 mx-auto">
              <TabsTrigger value="new-entry" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> New Entry
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Save className="h-4 w-4" /> History
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" /> Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new-entry">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-[800px] mx-auto">
                  <CardHeader>
                    <CardTitle>New Pain Entry</CardTitle>
                    <CardDescription>
                      Track your pain level, location, and symptoms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(date) => date && setDate(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bodyPart">Body Part</Label>
                        <Select onValueChange={setBodyPart} value={bodyPart}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select body part" />
                          </SelectTrigger>
                          <SelectContent>
                            {bodyPartOptions.map((part) => (
                              <SelectItem key={part} value={part}>
                                {part}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="painLevel">
                          Pain Level (0-10): {painLevel}
                        </Label>
                      </div>
                      <Slider
                        id="painLevel"
                        min={0}
                        max={10}
                        step={1}
                        value={[painLevel]}
                        onValueChange={(value) => setPainLevel(value[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>No Pain</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="painType">Pain Type</Label>
                      <Select onValueChange={setPainType} value={painType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pain type" />
                        </SelectTrigger>
                        <SelectContent>
                          {painTypeOptions.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any additional notes about your pain..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveEntry} className="w-full">
                      Save Entry
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="history">
              <Card className="max-w-[800px] mx-auto">
                <CardHeader>
                  <CardTitle>Pain History</CardTitle>
                  <CardDescription>
                    View and manage your recorded pain entries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {entries.length > 0 ? (
                    <AnimatePresence>
                      <div className="space-y-4">
                        {[...entries]
                          .sort((a, b) => b.date.getTime() - a.date.getTime())
                          .map((entry) => (
                            <motion.div
                              key={entry.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card>
                                <CardHeader className="py-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <CardTitle className="flex items-center text-lg">
                                        {entry.bodyPart}{" "}
                                        <Badge
                                          variant={
                                            entry.painLevel > 6
                                              ? "destructive"
                                              : entry.painLevel > 3
                                              ? "default"
                                              : "outline"
                                          }
                                          className="ml-2"
                                        >
                                          Level {entry.painLevel}
                                        </Badge>
                                      </CardTitle>
                                      <CardDescription>
                                        {format(entry.date, "PPP")} - {entry.painType} pain
                                      </CardDescription>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDeleteEntry(entry.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardHeader>
                                {entry.notes && (
                                  <CardContent className="py-2">
                                    <p className="text-gray-700 text-sm">{entry.notes}</p>
                                  </CardContent>
                                )}
                              </Card>
                            </motion.div>
                          ))}
                      </div>
                    </AnimatePresence>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No pain entries recorded yet</p>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("new-entry")}
                      >
                        Add Your First Entry
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends">
              <Card className="max-w-[1000px] mx-auto">
                <CardHeader>
                  <CardTitle>Pain Trends</CardTitle>
                  <CardDescription>
                    Visualize changes in your pain levels over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {entries.length > 0 ? (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Overall Pain Trend</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <Chart data={getChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 10]} />
                              <ChartTooltip />
                              <Line
                                type="monotone"
                                dataKey="painLevel"
                                stroke="#9b87f5"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                              />
                            </Chart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {uniqueBodyParts.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Pain by Body Part</h3>
                          <Tabs defaultValue={uniqueBodyParts[0]} className="w-full">
                            <TabsList className="mb-4 flex flex-wrap">
                              {uniqueBodyParts.map((part) => (
                                <TabsTrigger key={part} value={part}>
                                  {part}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {uniqueBodyParts.map((part) => (
                              <TabsContent key={part} value={part}>
                                <div className="h-[300px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <Chart
                                      data={getBodyPartData(part)}
                                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="date" />
                                      <YAxis domain={[0, 10]} />
                                      <ChartTooltip />
                                      <Line
                                        type="monotone"
                                        dataKey="painLevel"
                                        stroke="#7E69AB"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                      />
                                    </Chart>
                                  </ResponsiveContainer>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">
                        No data available to show trends
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("new-entry")}
                      >
                        Add Entries to See Trends
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default PainTracker;
