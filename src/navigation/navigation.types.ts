import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ['lessons']: {
    courseId: number;
    courseName: string;
    isTeacher: boolean;
    courseCode: string;
  };
  ['statistics']: { courseId: number; title: string };
  ['students-list']: { courseId: number; title: string };
  ['student-evaluations']: { userId: number; courseId: number; title: string };
  ['lesson']: { lessonId: number; lessonName: string };
  ['content']: { lessonId: number; glossaryId: number; title: string };
  ['test']: { lessonId: number; evaluationId: number; title: string };
  ['feedback-test']: {
    evaluationId: number;
    userEvaluationId: number;
    title: string;
  };
  ['create-lesson']: { courseId: number; lessonId?: number };
  ['create-content']: { lessonId: number; glossaryId?: number };
  ['create-test']: { lessonId: number; evaluationId?: number };
};

/* Lessons Screen */
export type LessonsScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'lessons'
>;
export type LessonsScreenRouteProps = RouteProp<RootStackParamList, 'lessons'>;

/* Lesson Screen */
export type LessonScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'lesson'
>;
export type LessonScreenRouteProps = RouteProp<RootStackParamList, 'lesson'>;

/* Content Screen */
export type ContentScreenRouteProps = RouteProp<RootStackParamList, 'content'>;

/* Test Screen */
export type TestScreenRouteProps = RouteProp<RootStackParamList, 'test'>;

/* Feedback Test Screen */
export type FeedbackTestScreenRouteProps = RouteProp<
  RootStackParamList,
  'feedback-test'
>;

/* Statistics Screen */
export type StatisticsScreenRouteProps = RouteProp<
  RootStackParamList,
  'statistics'
>;

/* Students list Screen */
export type StudentsListScreenRouteProps = RouteProp<
  RootStackParamList,
  'students-list'
>;

/* Student evaluations Screen */
export type StudentEvaluationsScreenRouteProps = RouteProp<
  RootStackParamList,
  'student-evaluations'
>;

/* Create Lesson Screen */
export type CreateLessonNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'create-lesson'
>;
export type CreateLessonScreenRouteProps = RouteProp<
  RootStackParamList,
  'create-lesson'
>;

/* Create Content Screen */
export type CreateContentScreenRouteProps = RouteProp<
  RootStackParamList,
  'create-content'
>;

/* Create Evaluation Screen */
export type CreateEvaluationScreenRouteProps = RouteProp<
  RootStackParamList,
  'create-test'
>;
