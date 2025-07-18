const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mt-2">
            <p>&copy; {new Date().getFullYear()} Your Dental Clinic. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-blue-400 hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="text-blue-400 hover:text-blue-600">Terms of Service</a>
            </div>
        </div>
        </footer>
    );
};
export default Footer;
// This component serves as the footer of the website, providing copyright information and links to privacy policy and terms of service.

        {/* <div className="container mx-auto text-center"> */}
