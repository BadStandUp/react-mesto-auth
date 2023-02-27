import React, {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {

    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deletedCard, setDeletedCard] = useState();

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        api.getUserInfo()
            .then((info) => {
                setCurrentUser(info);
            })
            .catch((err) => console.log(err));
    }, [])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsConfirmationPopupOpen(false);
    }

    function closeOnOverlayClick(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => setCards(state => {
                state.map((c) => c._id === card._id ? newCard : c);
            }))
            .catch((err) => console.log(err))
    }


    function handleCardDelete(card) {
        setIsLoading(true)
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => {
                    return item._id !== card._id;
                }))
                closeAllPopups()
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleUpdateUser(data) {
        setIsLoading(true)
        api.editProfile(data)
            .then((info) => {
                setCurrentUser(info);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.editAvatar(data)
            .then((info) => {
                setCurrentUser(info);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true)
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleDeleteCard(card) {
        setIsConfirmationPopupOpen(true)
        setDeletedCard(card)
    }

    return (
        <div className="page">
            <div className="page__content">

                <CurrentUserContext.Provider value={currentUser}>
                    <Header/>
                    <Main
                        cards={cards}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCard}
                    />
                    <Footer/>
                    <EditProfilePopup
                        isLoading={isLoading}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isLoading={isLoading}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isLoading={isLoading}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onOverlay={closeOnOverlayClick}
                        onClose={closeAllPopups}
                    />
                    <ConfirmationPopup
                        card={deletedCard}
                        isLoading={isLoading}
                        isOpen={isConfirmationPopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onCardDelete={handleCardDelete}
                    />
                </CurrentUserContext.Provider>

            </div>
        </div>
    );
}

export default App;
