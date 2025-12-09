import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";

import ProfileCard from "@/features/mypage/components/ProfileCard";
import LectureCard from "@/features/mypage/components/LectureCard";

import ClassDetailTopBar from "@/features/classdetail/components/ClassDetailTopBar";
import ClassDetailTabs from "@/features/classdetail/components/ClassDetailTabs";
import ClassDateSlider from "@/features/classdetail/components/ClassDateSlider";
import ClassSnapshotViewer from "@/features/classdetail/components/ClassSnapshotViewer";

import { useUser } from "@/hooks/useUser";
import { useMyClasses } from "@/features/mypage/services/mypageService";
import { useSnapshots } from "@/features/classdetail/services/snapshotService";
import { generateDateRange } from "@/features/classdetail/utils/generateDateRange";

import defaultImg from "@/assets/img1.jpg";
import styles from "./StudentClassDetail.module.css";
import CodeModal from "../../features/classdetail/components/CodeModal";
import { useClassInfo } from "../../features/classdetail/services/classinfoService";

export default function StudentClassDetail() {

  const navigate = useNavigate();

  // url을 통해서 classId get
  const [params] = useSearchParams();
  const classId = params.get("classId");

  // React Query를 사용해서 param에서 추출한 Id로 ClassInfo get
  const { data: classInfo, isLoading, error } = useClassInfo(classId);
  console.log("classinfo:" , classInfo);
  const Lecutretitle = classInfo?.title ?? "";
  console.log(Lecutretitle)
  
  // user 객체 데이터 get
  const { user } = useUser();

  // snapshot modal Open Status
  const [open, setOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

  // snapshot modal hook
  const handleOpenModal = (item) => {
    setSelectedSnapshot(item);
    setOpen(true);
  }

  // my class info get
  const {
    data: myClasses,
    isLoading: loadingClasses,
    error: classesError
  } = useMyClasses(0, 10);

  // my snapshot List get
  const {
    data: snapshots,
    isLoading: loadingSnapshots,
    error: snapshotsError
  } = useSnapshots(classId, 0, 3);

  //classroom 정보 get

  const snapshotDates = [
  "2025-12-08",
  "2025-12-09",
  "2025-12-10",
];

  const dates = generateDateRange(
    "2025-11-01",
    "2025-12-31",
    snapshotDates
  );
  const [selected, setSelected] = useState(dates[0]?.raw ?? null);

  const filteredSnapshots = snapshots?.content?.filter(snap => {
    const snapDate = snap.createdAt.split("T")[0];
    return snapDate === selected;
  }) ?? [];
  console.log(user);
  console.log("[FILTER] 날짜로 필터링된 스냅샷 =", filteredSnapshots);

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      
      {/* 왼쪽 프로필 + 클래스 리스트 */}
      <div className={styles.profileSection}>
        
        <div className={styles.profileCardWrapper}>
          <ProfileCard
            name={user.name}
            email={user.email}
            imageUrl={defaultImg}
          />
        </div>

        <div className={styles.lectureSection}>
          {myClasses?.content?.map(item => (
            <LectureCard
              key={item.classId}
              title={item.title}
              teacher={item.teacherName}
              imageUrl={item.thumbnailUrl ?? defaultImg}
              onClick={() => {
                console.log(`[NAVIGATE] classId=${item.classId} 클릭됨`);
                navigate(`/classdetail/student?classId=${item.classId}`);
              }}
            />
          ))}
        </div>
      </div>

      {/* 오른쪽 상세 */}
      <div className={styles.detailSection}>
        <div className={styles.contentContainer}>

          <ClassDetailTopBar
          title={Lecutretitle} />
          <ClassDetailTabs />

          <ClassDateSlider
            dates={dates}
            selected={selected}
            onSelect={(raw) => {
              console.log("[DATE] 날짜 선택됨 =", raw);
              setSelected(raw);
            }}
          />

          <div className={styles.snapshotContainer}>
            
            {/* Snapshot 렌더링 */}
            {filteredSnapshots.length > 0 ? (
              filteredSnapshots.map(snap => (
                <ClassSnapshotViewer
                  key={snap.snapshotId}
                  filename={snap.title}
                  code={snap.content}
                  onExpand={() =>
                  handleOpenModal({
                    title: snap.title,
                    content: snap.content
                  })
                }

                />
              ))
            ) : (
              <div>해당 날짜에 스냅샷이 없습니다.</div>
            )}

          </div>

        </div>
      </div>

      <CodeModal
        open={open}
        onClose={() => setOpen(false)}
        title={selectedSnapshot?.title}
        code={selectedSnapshot?.content}
      />
    </div>

    
  );
}
