import {ObjectId} from 'bson';

class Medium {
  constructor({
    link,
    partition,
    archived = Medium.ARCHIVED_FALSE,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.link = link;
    this.archived = archived;
  }

  static ARCHIVED_FALSE = false;
  static ARCHIVED_TRUE = true;
  
  static schema = {
    name: 'Medium',
    properties: {
      _id: 'objectId',
      _partition: 'string?',
      link: 'string',
      archived: 'bool',
      type: 'string',
      purpose: 'string'
    },
    primaryKey: '_id',
  };
}
export {Medium};