
import house1 from "../../assets/images/Luxurious Twilight Estate.jpeg";
import house2 from "../../assets/images/Modern House at Dusk.jpeg";
import house3 from "../../assets/images/Modern House with Landscaped Garden.jpeg";
import house4 from "../../assets/images/Modern Architecture and Luxury Car.jpeg";
import "../../cssFile/landingpage.css"
// type Property = {
//   id: number;
//   image: string;
//   title: string;
//   price: string;
// };

// const properties: Property[] = [
//   {
//     id: 1,
//     image: house1,
//     title: "Modern Apartment in Lagos",
//     price: "₦450,000/year",
//   },
//   {
//     id: 2,
//     image: house2,
//     title: "Luxury Villa in Abuja",
//     price: "₦1,200,000/year",
//   },
//   {
//     id: 3,
//     image: house3,
//     title: "Cozy Home in Port Harcourt",
//     price: "₦350,000/year",
//   },
//   {
//     id: 4,
//     image: house4,
//     title: "Elegant Duplex in Lekki",
//     price: "₦900,000/year",
//   },
//   {
//     id: 5,
//     image: house3,
//     title: "Beachfront House in VI",
//     price: "₦1,500,000/year",
//   },
// ];

const PhotoGallery: React.FC = () => {
  return (
    <section className="gallery-container">
      <h2>Available Houses for rent</h2>
      <div className="photo-gallery">
        <div className="gallery-column">
          <div className="photo">
            <img src={house3} alt="" />
          </div>
          <div className="photo">
            <img src={house2} alt="" />
          </div>
          <div className="photo">
            <img src={house1} alt="" />
          </div>
        </div>
        <div className="gallery-column">
          <div className="photo">
            <img src={house1} alt="" />
          </div>
          <div className="photo">
            <img src={house3} alt="" />
          </div>
          <div className="photo">
            <img src={house2} alt="" />
          </div>
        </div>
        <div className="gallery-column">
          <div className="photo">
            <img src={house4} alt="" />
          </div>
          <div className="photo">
            <img src={house2} alt="" />
          </div>
          <div className="photo">
            <img src={house1} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
