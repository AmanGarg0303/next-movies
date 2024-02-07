import { Navbar } from "@/components/Navbar";
import React from "react";
import { CardComponent } from "@/components/Card";
import { ClapperboardIcon, BlocksIcon, Users2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoviesList } from "@/components/MoviesList";
// import { CategoriesList } from "@/components/CategoriesList";
// import { UsersList } from "@/components/UsersList";
import { dashboardTotalLists } from "@/actions/dashboardTotalLists";
import dynamic from "next/dynamic";

const CategoriesList = dynamic(() => import("@/components/CategoriesList"));
const UsersList = dynamic(() => import("@/components/UsersList"));

export default async function DashboardPage() {
  const data = await dashboardTotalLists();

  return (
    <div>
      <Navbar />

      <div className="mt-20 px-20 py-12 flex flex-col gap-y-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardComponent
            title="Total Movies"
            data={data?.totalMovies}
            icon={<ClapperboardIcon />}
          />
          <CardComponent
            title="Total Categories"
            data={data?.totalCategories}
            icon={<BlocksIcon />}
          />
          <CardComponent
            title="Total Users"
            data={data?.totalUsers}
            icon={<Users2Icon />}
          />
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
