const handleToggle = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("hidden");
};

const handleClickObjectName = (e) => {
    console.log(e.target.innerText);
};

const DirectoryTree = ({ results }) => (
    <ul className="directory-tree list-none pl-4 select-none">
        <li className="mb-2">
            <span className="folder font-bold cursor-pointer" onClick={handleToggle}>
                Scene
            </span>
            <ul className="pl-4">
                {results.map(({ name }) => (
                    <li
                        className="mb-2 py-0.1 pl-2 hover:bg-gray-500 cursor-default hover:cursor-default"
                        onClick={handleClickObjectName}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </li>
        <li className="mb-2">
            <span className="folder font-bold cursor-pointer" onClick={handleToggle}>
                Folder 2
            </span>
            <ul className="pl-4">
                <li className="mb-2">
                    <span className="file cursor-pointer">File 3</span>
                </li>
                <li className="mb-2">
                    <span className="file cursor-pointer">File 4</span>
                </li>
            </ul>
        </li>
    </ul>
);

export default DirectoryTree;
