import { Repository } from "typeorm"

export abstract class AbstractService {
    protected constructor(
        protected readonly repository: Repository<any>
    ) {}
  
    async save(options) {
      return await this.repository.save(options)
    }
  
    async findOne(options) {
      return await this.repository.findOne(options)
    }
  
    async update(id: number, options) {
      return await this.repository.update(id, options)
    }
  
    async find(options = {}) {
      return await this.repository.find(options)
    }

    async delete(id: number) {
      return await this.repository.delete(id)
    }
}