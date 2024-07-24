"use client"; // This is a client component 
import WithAuth from "@/components/hoc/withAuth"

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Home PAge books</div>
    </main>
  );
}

export default WithAuth(Home)
