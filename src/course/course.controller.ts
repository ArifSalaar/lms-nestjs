import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/schemas/user.types';


@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Only instructors can create courses
  @UseGuards(AuthGuard, RolesGuard)
 @Roles(Role.Admin)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req: any) {
    const instructorId = req.user.sub;
    return this.courseService.create(createCourseDto);
  }

//   // Anyone authenticated can see all courses
//   @UseGuards(AuthGuard)
//   @Get()
//   async findAll() {
//     return this.courseService.findAll();
//   }

//   @UseGuards(AuthGuard)
//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.courseService.findOne(id);
//   }

//   // Only instructors can update their courses
//   @UseGuards(AuthGuard, RolesGuard)
//   @Roles(Role.Admin)
//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
//     return this.courseService.update(id, updateCourseDto);
//   }

//   // Only instructors can delete their courses
//   @UseGuards(AuthGuard, RolesGuard)
//   @Roles(Role.Admin)
//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.courseService.remove(id);
//   }

//   // Students can enroll in course
  
 }
