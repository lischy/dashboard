import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SmallCard from "@/app/components/backend/user/SmallCard";
import OrdersTable from "@/app/components/backend/user/ordersTable";
import { fetchClientOrdersCount } from "@/app/lib/data";
import { getCurrentUser } from "@/auth/nextjs/data";

export default async function Home() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  console.log(user);

  const fetchClientOrdersCountResponse = await fetchClientOrdersCount({
    client_id: 1,
  });
  if (fetchClientOrdersCountResponse.status !== 200) {
    return;
  }
  const data = fetchClientOrdersCountResponse.data;
  return (
    <Paper sx={{ pl: 2 }}>
      <Typography>Dashboard</Typography>
      <Grid
        sx={{
          display: "grid",
          gap: 6,
          gridTemplateColumns: "auto auto auto auto",
          pt: 2,
          pb: 4,
        }}
      >
        {data.map((item, index) => (
          <Grid key={index}>
            <SmallCard item={item} />
          </Grid>
        ))}
      </Grid>

      <OrdersTable />
    </Paper>

    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     Test
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
}
