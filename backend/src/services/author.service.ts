import { db } from '../utils/db.server';
import { TAuthorRead, TAuthorID, TAuthorWrite } from '../types/general';

const toTitleCase = (str: any) => {
  if (!str) {
    return '';
  }
  const strArr = str.split(' ').map((word: any) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });
  return strArr.join(' ');
}

export const listAuthors = async (): Promise<TAuthorRead[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getAuthor = async (id: TAuthorID): Promise<TAuthorRead | null> => {
  return db.author.findUnique({
    where: {
      id: id,
    },
  });
};

export const createAuthor = async (author: TAuthorWrite): Promise<TAuthorRead> => {
  const { firstName, lastName } = author;
  return db.author.create({
    data: {
      // convert names to title case
      firstName: toTitleCase(firstName),
      lastName: toTitleCase(lastName),
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const updateAuthor = async (author: TAuthorWrite, id: TAuthorID): Promise<TAuthorRead> => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: {
      id: id,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const deleteAuthor = async (id: TAuthorID): Promise<void> => {
  await db.author.delete({
    where: {
      id: id,
    },
  });
};