
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Eleve, COMPETENCES_MSPC, CompetenceCode } from "@/types/mspc";
import { NiveauFormation } from "@/types/niveauFormation";

interface StudentSkillsChartProps {
  student: Eleve;
  className?: string;
}

const StudentSkillsChart: React.FC<StudentSkillsChartProps> = ({ student, className }) => {
  // Determine which competences are applicable for this student's level
  const getApplicableCompetences = () => {
    if (!student.classe) return [];
    return COMPETENCES_MSPC.filter(comp => comp.niveau.includes(student.classe));
  };
  
  const applicableCompetences = getApplicableCompetences();
  const totalCompetences = applicableCompetences.length;
  
  // Count statuses
  const getCompetenceStats = () => {
    const stats = {
      acquired: 0,
      inProgress: 0,
      notStarted: 0,
      failed: 0
    };
    
    // Map of all competence codes to track their status
    const competencesMap = new Map<CompetenceCode, string>();
    
    // First identify all applicable competences as "not started"
    applicableCompetences.forEach(comp => {
      competencesMap.set(comp.code, "notStarted");
    });
    
    // Update with actual student data
    student.competencesAcquises.forEach(comp => {
      if (!competencesMap.has(comp.code)) return;
      
      switch (comp.niveau) {
        case "maîtrise":
          competencesMap.set(comp.code, "acquired");
          break;
        case "application":
        case "découverte":
          competencesMap.set(comp.code, "inProgress");
          break;
        default:
          break;
      }
    });
    
    // Count statistics
    competencesMap.forEach(status => {
      stats[status as keyof typeof stats]++;
    });
    
    return stats;
  };
  
  const stats = getCompetenceStats();
  
  const chartData = [
    { name: "Acquises", value: stats.acquired, color: "#4ade80" },
    { name: "En cours", value: stats.inProgress, color: "#60a5fa" },
    { name: "Non démarrées", value: stats.notStarted, color: "#d1d5db" },
    { name: "Échouées", value: stats.failed, color: "#f87171" }
  ].filter(item => item.value > 0);
  
  const levelData = [
    { name: "Découverte", value: student.competencesAcquises.filter(c => c.niveau === "découverte").length, color: "#60a5fa" },
    { name: "Application", value: student.competencesAcquises.filter(c => c.niveau === "application").length, color: "#818cf8" },
    { name: "Maîtrise", value: student.competencesAcquises.filter(c => c.niveau === "maîtrise").length, color: "#34d399" }
  ].filter(item => item.value > 0);
  
  if (totalCompetences === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Aucune compétence applicable pour ce niveau</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const completionPercentage = Math.round((stats.acquired / totalCompetences) * 100);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Progression des compétences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2 text-center">Statut des compétences</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-center">Niveaux d'acquisition</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {levelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-muted/20 rounded-lg text-center">
          <div className="text-2xl font-bold">{completionPercentage}%</div>
          <div className="text-sm text-muted-foreground">Progression globale</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSkillsChart;
