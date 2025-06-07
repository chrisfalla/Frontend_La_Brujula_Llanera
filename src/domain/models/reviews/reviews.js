export default class ReviewModel {
    constructor({
        idReview,
        comment,
        ratingValue,
        idPlaceFk,
        idUserFk,
        dateTime,
        createdAt,
        updatedAt,
    }) {
        this.idReview = idReview;
        this.comment = comment;
        this.ratingValue = ratingValue;
        this.idPlaceFk = idPlaceFk;
        this.idUserFk = idUserFk;
        this.dateTime = dateTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        console.log("✅ ReviewModel creado correctamente:", {
            idReview: this.idReview,
            comment: this.comment,
            ratingValue: this.ratingValue,
            idPlaceFk: this.idPlaceFk,
            idUserFk: this.idUserFk
        });
   }

}