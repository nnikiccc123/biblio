import '../App.css';
import BookSearchField from "../comps/BookSearchField";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
        <div className="paragraph-container">
          <h1 className='home-title'>Welcome to the best online library</h1>
          <p>Welcome to our digital oasis of knowledge and imagination.
            Subscribe now to unlock a treasure trove of literary marvels, where every word is a gateway to new worlds and experiences.
            Embrace the future of reading with our extensive collection, conveniently accessible from your electronic devices, and embark on a journey through the realms of literature unlike any other.</p>
          <div className="search-container"> {/* Dodat div za search-container */}
            <div className="search-bar">
              <BookSearchField searchFunc={() => navigate('/search')} />
            </div>
          </div>
        </div>
      </div>
    );
};


export default Home;
