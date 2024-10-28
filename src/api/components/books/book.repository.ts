import { Service } from "typedi";
import { AppDataSource } from "../../../config/app.datasource";
import { BaseRepository } from "../../base/base.repository";
import { Book } from "./book.entity";

@Service()
export class BookRepository extends BaseRepository<Book> {

    private static _instance: BookRepository;
    repository = AppDataSource.getRepository(Book);

    async findByISBN(isbn: string): Promise<Book> {
        return await this.repository.findOne({ where: { isbn } })
      }

    static getInstance() {
      if (!BookRepository._instance) {
        BookRepository._instance = new BookRepository();
      }
      return BookRepository._instance;
    }
}