import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  // Create a new course
  async create(createCourseDto: CreateCourseDto ) {
   return await this.courseModel.create({
    name: createCourseDto.name,
    description: createCourseDto.description,
    level: createCourseDto.level,
    price: createCourseDto.price
   })
  }
}





  // // Get all courses
  // async findAll() {
  //   return this.courseModel.find().exec();
  // }

//   // Get a single course by ID
//   async findOne(id: string) {
//     const course = await this.courseModel.findById(id).exec();
//     if (!course) throw new NotFoundException('Course not found');
//     return course;
//   }

//   // Update course by ID
//   async update(id: string, updateCourseDto: UpdateCourseDto) {
//     const course = await this.courseModel
//       .findByIdAndUpdate(id, updateCourseDto, { new: true })
//       .exec();
//     if (!course) throw new NotFoundException('Course not found');
//     return course;
//   }

//   // Delete course by ID
//   async remove(id: string) {
//     const course = await this.courseModel.findByIdAndDelete(id).exec();
//     if (!course) throw new NotFoundException('Course not found');
//     return { message: 'Course deleted successfully' };
//   }

//   // Enroll a student
//   // async enroll(courseId: string, studentId: string) {
//   //   const course = await this.courseModel.findById(courseId);
//   //   if (!course) throw new NotFoundException('Course not found');

//   //   if (!course.students.includes(studentId)) {
//   //     course.students.push(studentId);
//   //     await course.save();
//   //   }

//   //   return course;
//   // }
// }
