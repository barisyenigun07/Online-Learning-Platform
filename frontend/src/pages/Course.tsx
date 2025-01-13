import React, { useEffect, useState } from 'react'
import { Assignment, ContentType, Quiz, Video } from '../models/Content'
import { useParams } from 'react-router'
import { Course } from '../models/Course'
import SectionAccordion from '../components/SectionAccordion'

const VideoContent = ({content}: {content: Video}) => (
    <div>
        <video src={`http://localhost:8080/content/video/file?filename=${content.url}`} controls width={950} height={750}></video>
    </div>
)

const QuizContent = ({content}: {content: Quiz}) => {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({})

    const handleOptionChange = (questionId: number, option: string) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [questionId]: option,
      }));
    };

    return (
      <div>
        {content.questions.map((question, index) => (
          <div key={question.id} className="mb-5">
            <p>{index + 1}. {question.text}</p>
            <ul>
              {question.options.map((option, idx) => (
                <li>
                  <input type="radio" value={option} checked={selectedOptions[question.id] === option} onChange={() => handleOptionChange(question.id, option)}/>
                  <label className="ml-3" key={idx}>{option}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
}

const AssignmentContent = ({content}: {content: Assignment}) => (
    <div>
        <p>{content.description}</p>
    </div>
)

const ContentRenderer = ({content}: {content: ContentType}) => {
  switch(content.type) {
    case "video":
      return <VideoContent content={content as Video}/>
    case "quiz":
      return <QuizContent content={content as Quiz}/>
    case "assignment":
      return <AssignmentContent content={content as Assignment}/>
  }
}

const CoursePage = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<Course>({id: 0, title: "", description: "", user: {id: 0, name: "", email: "", role: ""}, sections: []});
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);

  const getCourse = async () => {
    const response = await fetch(`http://localhost:8080/course/${id}`);
    const data = await response.json();
    setCourse(data);

    if (data.sections.length > 0 && data.sections[0].contents.length > 0) {
      setSelectedContent(data.sections[0].contents[0]);
    }
  }
  

  useEffect(() => {
    getCourse();
  }, []);

  const handleContentSelect = (content: ContentType) => {
    setSelectedContent(content);
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-5xl font-semibold">{course.title}</h3>
      </div>
      {selectedContent && (
        <div className="flex justify-center mt-10">
          <ContentRenderer content={selectedContent}/>
        </div>
      )}
      <div className="mt-16">
        <SectionAccordion sections={course.sections} onContentSelect={handleContentSelect}/>
      </div>
    </div>
  )
}

export default CoursePage