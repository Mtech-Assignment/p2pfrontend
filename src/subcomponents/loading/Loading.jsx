import { Oval, ThreeDots } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loading = ({ type = "dots" }) => (
    <div className="absolute z-30 min-h-screen w-[98.5%] bg-transparent overflow-x-hidden">
        <div className="opacity-30 w-full min-h-screen bg-slate-300"></div>
        <div className="absolute top-[30%] left-[46%] z-50">
            {type === "dots" ? (
                <ThreeDots
                    height="100"
                    width="100"
                    radius="9"
                    color="rgb(59 130 246)"  // Adjust the color here if needed
                    ariaLabel="loading"  // Updated to a more generic ariaLabel for accessibility
                />
            ) : (
                <Oval
                    height="100"
                    width="100"
                    radius="9"
                    color="#48bb78"  // Adjust the color here if needed
                    ariaLabel="loading"  // Updated to a more generic ariaLabel for accessibility
                />
            )}
        </div>
    </div>
);

Loading.propTypes = {
    type: PropTypes.string,
}

export default Loading;
