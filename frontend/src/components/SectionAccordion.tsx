import React, { useState } from 'react'
import { Section } from '../models/Section'

const SectionAccordion = ({sections}: {sections: Section[]}) => {
    const [activeIndex, setActiveIndex] = useState(null);

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
            <div className="p-4 bg-white">
              {section.contents.map((content) => (
                <p key={content.id} className="text-gray-700 py-1">
                  {content.title}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    )
}

export default SectionAccordion