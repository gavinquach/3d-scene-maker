const DirectoryTree = ({ results, setSelectedMesh }) => {
    const handleToggle = (e) => {
        e.currentTarget.nextElementSibling.classList.toggle("hidden");
    };

    const handleClickObjectName = (e) => {
        console.log(e.target.innerText);
        setSelectedMesh(null, e.target.innerText);
    };

    return (
        <ul className="directory-tree list-none select-none">
            <li className="mb-2">
                <span className="folder font-bold pl-4 cursor-pointer" onClick={handleToggle}>
                    Scene
                </span>
                <ul className="pl-8">
                    {results.map(({ name }) => (
                        <li
                            key={name}
                            className={`mb-2 py-0.4 pl-4 hover:bg-gray-500 cursor-default hover:cursor-default`}
                            onClick={handleClickObjectName}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    );
};

export default DirectoryTree;
