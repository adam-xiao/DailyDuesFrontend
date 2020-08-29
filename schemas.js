import {ObjectId} from 'bson';

class Medium {
  constructor({
    name,
    partition,
    link,
    status = Medium.STATUS_OPEN,
    type = "None",
    purpose = "None",
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.link = link
    this.status = status;
    this.type = type;
    this.purpose = purpose;
  }

  static STATUS_OPEN = 'Open';
  static STATUS_HIBERNATED = 'Hibernated';
  static STATUS_ARCHIVED = 'Archived';
  static schema = {
    name: 'Medium',
    properties: {
      _id: 'objectId',
      _partition: 'string?',
      name: 'string',
      link: 'string',
      status: 'string',
      type: 'string',
      purpose: 'string'
    },
    primaryKey: '_id',
  };
}
export {Medium};