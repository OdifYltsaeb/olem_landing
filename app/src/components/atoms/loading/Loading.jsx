import BarsLoader from './bars';

const Loading = function ({ size = 'md' }) {
    const sizes = ['sm', 'md', 'lg'];
    let innerSize = size;
    if (sizes.indexOf(size) === -1) {
        innerSize = 'md';
    }
    return (
        <div className="w-full h-full bg-base-100/25 flex justify-center items-center">
            <BarsLoader size={innerSize} />
        </div>
    );
};

export default Loading;
