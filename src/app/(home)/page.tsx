import Categories from "../components/Categories";
import HeaderPage from "../components/Header";
import NewArrival from "../components/NewArrival";

export default function Home() {
  return (
    <div>
   <HeaderPage></HeaderPage>
   <Categories></Categories>
   <NewArrival></NewArrival>
    </div>
  );
}
