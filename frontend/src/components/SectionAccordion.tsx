import React, { useState } from 'react'
import { Section } from '../models/Section'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router';

const SectionAccordion = ({sections}: {sections: Section[]}) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);
    const { isLoggedIn, authUser } = useSelector((state: RootState) => state.auth);

    const handleAccordionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    
    return (
        <div className="w-full max-w-2xl mx-auto border rounded-lg overflow-hidden">
      {sections.map((section, index) => (
        <div key={section.id} className="border-b">
          {/* Section Header */}
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => handleAccordionClick(index)}
          >
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <span className="text-xl font-bold">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          {/* Content List */}
          {activeIndex === index && (
            <div className="bg-white mt-2 p-3">
              {section.contents.map((content) => (
                <div key={content.id} className="hover:bg-gray-300 p-1">
                  <p className="text-gray-700">
                    {content.title}
                  </p>
                </div>
              ))}
              {isLoggedIn && authUser.role === "INSTRUCTOR" && authUser.id === section.course?.user.id ?
              <div className="flex justify-center mt-1">
                <button onClick={() => navigate(`/create/content/section/${section.id}`)} className="bg-red-700 hover:bg-red-900 w-44 p-2 text-white rounded-full">
                  Create Content
                </button> 
              </div> 
              : null
              }
            </div>
          )}
        </div>
      ))}
    </div>
    )
}

export default SectionAccordion