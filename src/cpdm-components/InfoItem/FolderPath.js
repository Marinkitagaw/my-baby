import { Link } from 'umi';

export default ({ repository = {}, folder = {} }) => {
  const { type = 'Project', id } = repository;
  const { folderPath, folderId } = folder;

  const pathOptions = {
    Product: `/repo/repository/${id}/folder/${folderId}`,
    Project: `/repo/project/${id}/folder/${folderId}`,
  };

  return (
    <Link to={pathOptions[type]} target="folder">
      {folderPath}
    </Link>
  );
};
