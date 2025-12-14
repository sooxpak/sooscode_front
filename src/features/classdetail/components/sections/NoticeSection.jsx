import { useSearchParams } from "react-router-dom";
import { fetchClassInfo } from "../../services/classinfoService";
import { useEffect, useState } from "react";
import styles from "./NoticeSection.module.css";
import Header from "./notice/Header";
import Section from "./notice/Section";
import NoticeEditor from "./notice/NoticeEditor";
import { useUser } from "../../../../hooks/useUser";

export default function NoticeSection() {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");
  const [classInfo, setClassInfo] = useState(null);
  const [description, setDescription] = useState("");
  const { user} = useUser();
  const isStudent = user?.role === "STUDENT";

  useEffect(() => {
    if (!classId) return;
    const load = async () => {
      const data = await fetchClassInfo(classId);
      console.log(data);
      setClassInfo(data);
      setDescription(data.description ?? "");
    };
    load();
  }, [classId]);
  



  if (!classInfo) return null;

  return (
    <section className={styles.wrapper}>
      
      <div className={styles.sectionContainer}>
        <div className={styles.thumbnailWrapper}>
          <img className={styles.thumbnail} src="/bruno.png" />
        </div>

        <header className={styles.header}>
          <Header title={classInfo.title} />
        </header>

        <Section classInfo={classInfo} />
        {!isStudent && (
        <>
          <NoticeEditor
            value={description}
            onChange={setDescription}
          />
        </>
      )}
        
      </div>

      {/* 
      뷰어용
      <Section>
        <NoticeViewer content={classInfo.description} />
      </Section> */}
      
      
    </section>
  );
}
