'use server';

import { load } from 'outstatic/server';

const getBlocks = async () => {
    'use server';

    const db = await load();
    const blocks = await db.find({ collection: 'blocks' }).toArray();
    return blocks;
};

const HomePage = function () {
    const blocks = getBlocks();
    console.log('BLCCKS ARE', blocks);
    return (
        <div className="w-full flex flex-col flex-1">
            <h1>Hello. This is base page</h1>
        </div>
    );
};

export default HomePage;
