export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const popupConfig = {
  editProfilePopup: '.popup_profile-edit',
  addCardPopup: '.popup_add-card',
  avatarPopup: '.popup_avatar',
  confirmationPopup: '.popup_confirm',
  imagePopup: '.popup_zoom-image'
}

export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '63f40bb4-bb4e-4f4f-b3cc-e405ac006139',
    'Content-Type': 'application/json'
  }
}
