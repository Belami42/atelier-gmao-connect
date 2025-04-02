
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wrench, CalendarDays, Send, Users, GraduationCap, BarChart } from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24 pb-16">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
            alt="Logo Étienne Mimard"
            className="h-40 md:h-48 w-auto object-contain" 
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Gestion des équipements et maintenance
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Plateforme complète pour gérer les équipements techniques, planifier la maintenance préventive et suivre les missions pédagogiques.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/equipment">
              <Wrench className="h-5 w-5" />
              Gérer les équipements
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/maintenance-calendar">
              <CalendarDays className="h-5 w-5" />
              Calendrier de maintenance
            </Link>
          </Button>
        </div>
      </div>

      <BlurryCard className="relative overflow-hidden my-12 p-8 mimard-gradient-blue">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img 
            src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
            alt="Logo Watermark"
            className="w-full h-full object-contain" 
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-3">Maintenance préventive systématique</h2>
          <p className="mb-6 max-w-2xl">
            Visualisez toutes les tâches de maintenance préventive planifiées sur l'ensemble des équipements et machines dans un calendrier annuel ou mensuel.
          </p>
          <Button asChild size="lg">
            <Link to="/maintenance-calendar">
              <CalendarDays className="mr-2 h-5 w-5" />
              Accéder au calendrier
            </Link>
          </Button>
        </div>
      </BlurryCard>

      <Separator className="my-12" />

      <h2 className="text-2xl font-bold mb-6">Fonctionnalités principales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="mimard-gradient-blue">
          <CardHeader>
            <Wrench className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Gestion des équipements</CardTitle>
            <CardDescription>
              Cataloguez et suivez l'état de tous vos équipements techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Centralisez les informations de vos machines, avec leur état, emplacement et historique de maintenance.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/equipment">Voir les équipements</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mimard-gradient-purple">
          <CardHeader>
            <CalendarDays className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Calendrier de maintenance</CardTitle>
            <CardDescription>
              Visualisez et planifiez les opérations de maintenance préventive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Consultez toutes les maintenances prévues par machine et créez directement des ordres de mission depuis le calendrier.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/maintenance-calendar">Accéder au calendrier</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mimard-gradient-green">
          <CardHeader>
            <Send className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Ordres de mission</CardTitle>
            <CardDescription>
              Créez et suivez les missions de maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Attribuez des tâches de maintenance aux étudiants et suivez leur avancement.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/missions">Voir les missions</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mimard-gradient-orange">
          <CardHeader>
            <BarChart className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Tableau de bord</CardTitle>
            <CardDescription>
              Visualisez les métriques de maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Suivez les indicateurs clés de performance de maintenance et l'état du parc d'équipements.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Voir le tableau de bord</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mimard-gradient-purple">
          <CardHeader>
            <GraduationCap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Gestion des compétences</CardTitle>
            <CardDescription>
              Suivez les compétences acquises par les étudiants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Associez des compétences aux missions et suivez leur acquisition par les étudiants.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/skills">Voir les compétences</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mimard-gradient-blue">
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Gestion des utilisateurs</CardTitle>
            <CardDescription>
              Gérez les profils des étudiants et du personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Ajoutez et modifiez les profils des utilisateurs de la plateforme.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/users">Voir les utilisateurs</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-12 flex justify-center">
        <SchoolLogo size="large" />
      </div>
    </div>
  );
};

export default Index;
