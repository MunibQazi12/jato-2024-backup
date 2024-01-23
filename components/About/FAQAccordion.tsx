'use client';

import { useState } from 'react';
import { StructuredText } from 'react-datocms/structured-text';
import { motion } from 'framer-motion';
import { QuestionRecord } from '@/graphql/generated';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Highlighter from '../Common/Highlighter';

const closeIcon = (
  <span className="rounded-full bg-gray-200 text-gray-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 12H6"
      />
    </svg>
  </span>
);

const openIcon = (
  <span className="rounded-full bg-blue-500 text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="sm:h-6 h-4 sm:w-6 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </span>
);

type Props = {
  title: Maybe<string>;
  subtitle: Maybe<string>;
  questions: Array<QuestionRecord>;
};

const FAQAccordion = ({ title, subtitle, questions }: Props) => {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  function toggleQuestion(id: string) {
    if (openQuestions.includes(id)) {
      setOpenQuestions((openQuestions) => {
        return [...openQuestions.filter((qID) => qID !== id)];
      });
    } else {
      setOpenQuestions((openQuestions) => [...openQuestions, id]);
    }
  }

  return (
    <section className="bg-white dark:bg-dark-background">
      <div className="container md:mx-auto md:max-w-auto max-w-full sm:px-6 px-4 lg:py-12 pt-12 pb-6">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-darktext lg:text-4xl">
          {title}
        </h1>
        <div className=" text-center text-gray-500">
          <ReactMarkdown>{subtitle || ''}</ReactMarkdown>
        </div>

        <div className="md:mx-8 sm:mt-8 mt-5 grid gap-4 xl:mx-40 lg:mx-32">
          {questions.map((question) => {
            const isOpen = openQuestions.includes(question.id);
            return (
              <motion.div
                layout="position"
                key={question.id}
                className={
                  'rounded-lg bg-gray-100 md:p-8 py-6 sm:px-4 px-3 hover:cursor-pointer dark:bg-gray-800'
                }
                onClick={() => {
                  toggleQuestion(question.id);
                }}
              >
                <button className="flex w-full items-center justify-between">
                  <h1 className="font-semibold text-gray-700 dark:text-darktext sm:text-base text-sm">
                    {question.question}
                  </h1>
                  {isOpen ? closeIcon : openIcon}
                </button>

                <motion.div
                  animate={isOpen ? 'open' : 'closed'}
                  variants={{
                    open: { opacity: 1 },
                    closed: { opacity: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className={
                    'mt-6 text-sm text-gray-500 dark:text-darktext' +
                    (isOpen ? '' : ' hidden')
                  }
                >
                  <StructuredText
                    data={question.answer.value}
                    renderNode={Highlighter}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
