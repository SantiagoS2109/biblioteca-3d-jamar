import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getModelos = async () => {
  const query = { data_source_id: process.env.DATABASE_ID };

  const response = await notion.dataSources.query(query);

  return response.results;
};
