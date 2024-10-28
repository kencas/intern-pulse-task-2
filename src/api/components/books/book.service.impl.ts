import { Service } from "typedi";
import { IBookManagementService } from "./book.service.interface";
import { BookRepository } from "./book.repository";
import CustomHttpError from "../../../config/error.handler";
import { AvailabilityStatusEnum, BookDto, BookOperationDto, BookOperationEnum, validateBookOperation, validateCreateBook } from "./book.dto";

@Service()
export class BookManagementService implements IBookManagementService{

    private readonly bookRepository: BookRepository = BookRepository.getInstance();
    private static _instance: BookManagementService;

    constructor() {

    }

    async performBookOperation(id: number, data: BookOperationDto) {
        const { error } = validateBookOperation(data);
        
        if (error) {
            throw new CustomHttpError(400, `Invalid requests. ${error.message}`);
        }

        let book = await this.bookRepository.findOne( { id });

        if (book == null) {
            throw new CustomHttpError(400, "Book does not exists!");
        }

        switch(data.bookOperation)
        {

            case BookOperationEnum.BORROW: 
                book.availabilityStatus = AvailabilityStatusEnum.BORROWED
            break;

            case BookOperationEnum.RETURN: 
                book.availabilityStatus = AvailabilityStatusEnum.AVAILABLE
            break;

            case BookOperationEnum.LOSS: 
                book.availabilityStatus = AvailabilityStatusEnum.LOST
            break;

            case BookOperationEnum.DAMAGE: 
                book.availabilityStatus = AvailabilityStatusEnum.DAMAGED
            break;
        }

        return this.bookRepository.save(book);

    }

    static getInstance() {
        if (!BookManagementService._instance) {
            BookManagementService._instance = new BookManagementService();
        }
        return BookManagementService._instance;
      }
    
    async createBook(createBook: BookDto): Promise<BookDto> {
        const { error } = validateCreateBook(createBook);
        if (error) {
            throw new CustomHttpError(400, `Invalid requests. ${error.message}`);
        }

        var book = await this.bookRepository.findByISBN(createBook.isbn);

        if (book != null) {
            throw new CustomHttpError(400, "Book already exists!");
        }

        book = await this.bookRepository.save(createBook);

        return book;
        
    }

    async getBookListing(): Promise<BookDto[]> {
        var books = await this.bookRepository.find();

        return books;
    }

    async getBookByCode(isbn: string): Promise<BookDto> {
        var book = await this.bookRepository.findByISBN(isbn);

        if (book == null) {
            throw new CustomHttpError(400, "Book does not exists!");
        }

        return book;
    }
    

    async getBookById(id: string | number): Promise<BookDto> {
        var book = await this.bookRepository.findById(id);

        if (book == null) {
            throw new CustomHttpError(400, "Book does not exists!");
        }

        return book;
    }


    async updateBook(id: number, data: BookDto): Promise<BookDto> {
        
        const { error } = validateCreateBook(data);
        
        if (error) {
            throw new CustomHttpError(400, `Invalid requests. ${error.message}`);
        }

        var book = await this.bookRepository.findById(id);

        if (book == null) {
            throw new CustomHttpError(400, "Book does not exists!");
        }

        book.title = data.title;
        book.genre = data.genre;
        book.author = data.author;
        book.publicationDate = data.publicationDate;
        book.edition = data.edition;
        book.summary = data.summary;

        book = await this.bookRepository.save(book);

        return book;
    }

    async deleteBook(id: number): Promise<void> {
        
        var book = await this.bookRepository.findById(id);

        if (book == null)
            throw new CustomHttpError(400, "Book does not exists!");


        if(book.availabilityStatus === AvailabilityStatusEnum.AVAILABLE as AvailabilityStatusEnum)
            throw new CustomHttpError(400, "Invalid Operation");

        if(book.availabilityStatus === AvailabilityStatusEnum.BORROWED as AvailabilityStatusEnum)
            throw new CustomHttpError(400, "Invalid Operation");


        await this.bookRepository.delete(id);

    }
}