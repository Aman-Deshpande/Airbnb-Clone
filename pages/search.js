import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {
  const router = useRouter();

  // ES6 destructuring
  const { location, startDate, enddate, numberofGuest } = router.query;

  // const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd");
  // const formattedenddate = format(new Date(enddate), "yyyy-MM-dd");
  // const range = `${formattedStartDate} - ${formattedenddate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${numberofGuest} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sm ">
            350+ {/*- {range} */} Stays for the selected dates for{" "}
            {numberofGuest} guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden md:inline-flex space-x-2 mb-4 text-gray-800">
            <p className="px-6 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-105 ease-out active:bg-gray-300">
              Cancellation Flexibility
            </p>
            <p className="px-6 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-105 ease-out active:bg-gray-300">
              Types of Places
            </p>
            <p className="px-6 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-105 ease-out active:bg-gray-300">
              Price
            </p>
            <p className="px-6 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-105 ease-out active:bg-gray-300">
              Rooms and Beds
            </p>
            <p className="px-6 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform duration-105 ease-out active:bg-gray-300">
              More Filters
            </p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((item) => (
              <InfoCard
                key={item.img}
                img={item.img}
                location={item.location}
                title={item.title}
                description={item.description}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults}/>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;
export async function getServerSideProps(context) {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
