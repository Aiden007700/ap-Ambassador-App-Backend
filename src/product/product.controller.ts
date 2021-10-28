import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all() {
    return await this.productService.find({})
  }

  @Get('/:id')
  async aProduct(@Param('id') id: number) {
    return await this.productService.findOne({id})
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    console.log(body)
    return await this.productService.save(body)
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(id, {...updateProductDto})
    return await this.aProduct(id)
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id)
    return {
      message: 'sucsess'
    }
  }
}
