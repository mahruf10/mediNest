import Categories from "../components/Categories";
import HeaderPage from "../components/Header";
import NewArrival from "../components/NewArrival";
import WhyChooseUsPage from "../components/WhyChoseus";

export default function Home() {
  return (
    <div>
   <HeaderPage></HeaderPage>
   <Categories></Categories>
   <NewArrival></NewArrival>
   <WhyChooseUsPage></WhyChooseUsPage>
    </div>
  );
}
