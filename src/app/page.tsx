"use client"; // This is a client component 
import WithAuth from "@/components/hoc/withAuth"

const Home = () => {
  return (
    <main >
      <div>Home PAge books</div>
    </main>
  );
}

export default WithAuth(Home)
