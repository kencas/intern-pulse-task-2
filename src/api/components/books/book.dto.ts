import Joi = require("joi");
import { title } from "process";

export interface BookDto
{
    isbn?: string;
    title?: string;
    author?: string;
    genre?: string;
    publicationDate?: Date;
    edition?: string;
    summary?: string;
    availabilityStatus?: AvailabilityStatusEnum;

}

export interface BookOperationDto {
    bookOperation?: BookOperationEnum;
}

export enum AvailabilityStatusEnum {
    AVAILABLE = "AVAILABLE",
    BORROWED = "BORROWED",
    LOST = "LOST",
    DAMAGED = "DAMAGED"
}

export enum BookOperationEnum {
    RETURN = "RETURN",
    BORROW = "BORROW",
    LOSS = "LOSS",
    DAMAGE = "DAMAGE",
}

// export enum LibraryStatus {
//     ACTIVE = "ACTIVE",
//     LOST = "LOST",
//     DAMAGED = "DAMAGED"
// }

export const validateCreateBook = (book: BookDto) =>
{
    const JoiSchema = Joi.object({
      
        isbn: Joi.string()
                  .required(),
        title: Joi.string()
                  .required(),
        author: Joi.string()
                  .required(),
        genre: Joi.string()
                  .required(),
        publicationDate: Joi.date()
                     .required(),
        edition: Joi.string()
                     .required(),
        summary: Joi.string()
                     .required()
        
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(book)
};


export const validateUpdateBook = (book: BookDto) =>
{
    const JoiSchema = Joi.object({
      
        isbn: Joi.string()
                  .required(),
        title: Joi.string()
                  .required(),
        author: Joi.string()
                  .required(),
        genre: Joi.string()
                  .required(),
        publicationDate: Joi.date()
                     .required(),
        edition: Joi.string()
                     .required(),
        summary: Joi.string()
                     .required()        

        
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(book)
}

export const validateBookOperation = (bookOperation: BookOperationDto) =>
{
    const JoiSchema = Joi.object({
      
        bookOperation: Joi.string()
        .valid(...Object.values(BookOperationEnum))
        .required(),    

        
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(bookOperation)
}