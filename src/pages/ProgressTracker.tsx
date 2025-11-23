import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, TrendingDown, TrendingUp, Camera, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type ProgressEntry = {
  id: string;
  date: Date;
  painLevel: number;
  mobility: number;
  strength: number;
  notes: string;
  photos: string[];
};

const ProgressTracker = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [painLevel, setPainLevel] = useState(5);
  const [mobility, setMobility] = useState(5);
  const [strength, setStrength] = useState(5);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleSaveEntry = () => {
    const newEntry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date(),
      painLevel,
      mobility,
      strength,
      notes,
      photos: [...photos],
    };
    setEntries([...entries, newEntry]);
    toast.success("Progress entry saved!");
    setPainLevel(5);
    setMobility(5);
    setStrength(5);
    setNotes("");
    setPhotos([]);
  };

  const getChartData = () => {
    return entries.map(entry => ({
      date: format(entry.date, "MMM d"),
      pain: entry.painLevel,
      mobility: entry.mobility,
      strength: entry.strength,
    }));
  };

  const getAverageProgress = () => {
    if (entries.length === 0) return { pain: 0, mobility: 0, strength: 0 };
    const sum = entries.reduce((acc, entry) => ({
      pain: acc.pain + entry.painLevel,
      mobility: acc.mobility + entry.mobility,
      strength: acc.strength + entry.strength,
    }), { pain: 0, mobility: 0, strength: 0 });
    return {
      pain: (sum.pain / entries.length).toFixed(1),
      mobility: (sum.mobility / entries.length).toFixed(1),
      strength: (sum.strength / entries.length).toFixed(1),
    };
  };

  const avgProgress = getAverageProgress();

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle
          title="Treatment Progress Tracker"
          subtitle="Document your recovery journey with photos, notes, and detailed metrics"
          center
        />

        <div className="mt-12 max-w-6xl mx-auto">
          <Tabs defaultValue="log" className="w-full">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3 mx-auto">
              <TabsTrigger value="log">
                <Plus className="h-4 w-4 mr-2" /> Log Progress
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Calendar className="h-4 w-4 mr-2" /> Timeline
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <TrendingUp className="h-4 w-4 mr-2" /> Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="log">
              <Card>
                <CardHeader>
                  <CardTitle>Log Your Progress</CardTitle>
                  <CardDescription>Track pain levels, mobility, strength, and add progress photos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Pain Level: {painLevel}</Label>
                        <span className="text-sm text-muted-foreground">0 = No pain, 10 = Severe</span>
                      </div>
                      <Slider value={[painLevel]} onValueChange={(v) => setPainLevel(v[0])} min={0} max={10} step={1} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Mobility: {mobility}</Label>
                        <span className="text-sm text-muted-foreground">0 = Very limited, 10 = Full range</span>
                      </div>
                      <Slider value={[mobility]} onValueChange={(v) => setMobility(v[0])} min={0} max={10} step={1} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Strength: {strength}</Label>
                        <span className="text-sm text-muted-foreground">0 = Very weak, 10 = Full strength</span>
                      </div>
                      <Slider value={[strength]} onValueChange={(v) => setStrength(v[0])} min={0} max={10} step={1} />
                    </div>

                    <div>
                      <Label>Progress Photos</Label>
                      <div className="mt-2">
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                            <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload photos</p>
                          </div>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                        {photos.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            {photos.map((photo, idx) => (
                              <img key={idx} src={photo} alt={`Progress ${idx + 1}`} className="rounded-lg object-cover h-32 w-full" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Notes</Label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="How are you feeling? Any improvements or challenges?"
                        rows={4}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveEntry} className="w-full">Save Progress Entry</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Your Recovery Timeline</CardTitle>
                  <CardDescription>View all your progress entries in chronological order</CardDescription>
                </CardHeader>
                <CardContent>
                  {entries.length === 0 ? (
                    <div className="text-center py-12">
                      <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">No progress entries yet</p>
                      <Button variant="outline">Log Your First Entry</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {entries.reverse().map((entry) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{format(entry.date, "PPP")}</h3>
                              <p className="text-sm text-muted-foreground">{format(entry.date, "p")}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline">Pain: {entry.painLevel}</Badge>
                              <Badge variant="outline">Mobility: {entry.mobility}</Badge>
                              <Badge variant="outline">Strength: {entry.strength}</Badge>
                            </div>
                          </div>
                          
                          {entry.photos.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              {entry.photos.map((photo, idx) => (
                                <img key={idx} src={photo} alt={`Progress ${idx}`} className="rounded-lg object-cover h-40 w-full" />
                              ))}
                            </div>
                          )}
                          
                          {entry.notes && (
                            <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">{entry.notes}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                    <CardDescription>See how your recovery is trending over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {entries.length === 0 ? (
                      <div className="text-center py-12">
                        <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No data available yet</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Avg Pain</p>
                                <p className="text-3xl font-bold">{avgProgress.pain}</p>
                                <TrendingDown className="h-5 w-5 mx-auto mt-2 text-green-500" />
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Avg Mobility</p>
                                <p className="text-3xl font-bold">{avgProgress.mobility}</p>
                                <TrendingUp className="h-5 w-5 mx-auto mt-2 text-green-500" />
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Avg Strength</p>
                                <p className="text-3xl font-bold">{avgProgress.strength}</p>
                                <TrendingUp className="h-5 w-5 mx-auto mt-2 text-green-500" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={getChartData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 10]} />
                              <Tooltip />
                              <Line type="monotone" dataKey="pain" stroke="#ef4444" strokeWidth={2} name="Pain" />
                              <Line type="monotone" dataKey="mobility" stroke="#3b82f6" strokeWidth={2} name="Mobility" />
                              <Line type="monotone" dataKey="strength" stroke="#22c55e" strokeWidth={2} name="Strength" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProgressTracker;
