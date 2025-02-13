import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import SelectedMovie from "../pages/SelectedMovie";
import AllSeasons from "../pages/AllSeasons";
import AllCastAndCrew from "../pages/AllCastAndCrew";
import AllReviews from "../pages/AllReviews";
import PersonPage from "../pages/PersonPage";
import CompanyPage from "../pages/CompanyPage";
import CollectionPage from "../pages/CollectionPage";
import SelectedSeason from "../pages/SelectedSeason";
import EpisodePage from "../pages/EpisodePage";
import KeywordPage from "../pages/KeywordPage";
import AllVideos from "../pages/AllVideos";
import HowToUse from "../pages/HowToUse";
import Error from "../pages/Error";
import Wishlist from "../pages/Wishlist";

export default function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:category/:id" element={<CategoryPage />} />
        <Route path="/results/:id" element={<SearchResultsPage />} />
        <Route path="/:keyword/:title/:id" element={<SelectedMovie />} />
        <Route path="/seasons/:title/:id" element={<AllSeasons />} />
        <Route path="/:title/all-cast-and-crew" element={<AllCastAndCrew />} />
        <Route path="/:title/all-reviews" element={<AllReviews />} />
        <Route path="/person/:title/:id" element={<PersonPage />} />
        <Route path="/company/:name/:id" element={<CompanyPage />} />
        <Route path="/collection/:name/:id" element={<CollectionPage />} />
        <Route path="/seasons/:season/season/:title/:id" element={<SelectedSeason />} />
        <Route path="/seasons/:season/:episode/:title/:id" element={<EpisodePage />} />
        <Route path="/keyword/:name/:id" element={<KeywordPage />} />
        <Route path="/:title/all-videos" element={<AllVideos />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="*" element={<Error />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}
