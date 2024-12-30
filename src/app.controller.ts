import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('admin')
  getAdminPage() {
    return { message: 'Welcome to the Admin Page!' };
  }
}
