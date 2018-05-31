import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import ListItemDescription from '../lib/ListItemDescription';
import LinkButton from '../lib/LinkButton';
import EditListActionButton from '../lib/EditListActionButton';
import DeleteListActionButton from '../lib/DeleteListActionButton';

const QuestionList = props => (
  <List
    rowKey="key"
    dataSource={props.questions}
    locale={{ emptyText: 'No questions' }}
    renderItem={question => (
      <List.Item
        actions={[
          <EditListActionButton onClick={() => props.onEdit(question.key)} />,
          <DeleteListActionButton onConfirm={() => props.onDelete(question.key)} />,
        ]}
      >
        <List.Item.Meta
          title={
            <LinkButton onClick={() => props.onEdit(question.key)}>{question.title}</LinkButton>
          }
          description={<ListItemDescription>{question.description}</ListItemDescription>}
        />
      </List.Item>
    )}
  />
);

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionList;
