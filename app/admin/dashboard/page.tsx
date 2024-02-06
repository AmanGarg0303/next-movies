import { Navbar } from "@/components/Navbar";
import React from "react";
import { CardComponent } from "@/components/Card";
import {
  ClapperboardIcon,
  BlocksIcon,
  Users2Icon,
  Trash2Icon,
  ViewIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoviesList } from "@/components/MoviesList";
import { CategoriesList } from "@/components/CategoriesList";
import { UsersList } from "@/components/UsersList";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />

      <div className="mt-20 px-20 py-12 flex flex-col gap-y-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardComponent
            title="Total Movies"
            data="45"
            icon={<ClapperboardIcon />}
          />
          <CardComponent
            title="Total Categories"
            data="20"
            icon={<BlocksIcon />}
          />
          <CardComponent title="Total Users" data="2" icon={<Users2Icon />} />
        </div>

        <div>
          <Tabs defaultValue="movies" className="space-y-4">
            <TabsList className="bg-[#201f23]">
              <TabsTrigger value="movies" className="">
                Movies
              </TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="movies">
              <MoviesList />
            </TabsContent>
            <TabsContent value="categories">
              <CategoriesList />
            </TabsContent>
            <TabsContent value="users">
              <UsersList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
