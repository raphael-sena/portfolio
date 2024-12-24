// app/page.tsx
import Header from '@/components/Header';
import MainContent from '@/components/MainContent';

const Page = () => {
  return (
    <div className="p-4">
      <div className="">
        <div>
          <div className="min-h-screen w-full">
            <Header />
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
