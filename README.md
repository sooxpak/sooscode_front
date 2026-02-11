# 서비스 소개

![logo.png](attachment:810ac99b-d97c-4032-8b21-502b904b61e8:logo.png)

> 실시간 화상 강의, 코드 공유, 안전한 실행 환경을 하나로 통합한 실습 중심 온라인 코딩 교육 플랫폼
> 

---

## 프로젝트 개요

### 배경 및 문제 인식

온라인 코딩 교육 환경에서 발생하는 주요 문제점:

- **환경 설정의 복잡함**: 학생마다 다른 OS, 개발 환경으로 인한 초기 진입 장벽
- **실시간 피드백의 한계**: 화면 공유 방식의 일방향 소통
- **서버 안정성 문제**: 다수 사용자의 동시 코드 실행으로 인한 서버 과부하
- **보안 위험**: 악성 코드 실행(RCE)에 대한 근본적인 대책 부재

### 솔루션

비동기 컴파일 처리, Docker 격리 실행, WebRTC 기반 실시간 강의를 핵심 기술로 채택하여 안정적이고 안전한 통합 코딩 교육 플랫폼 구현

---

## 핵심 기능

![image.png](attachment:1bdac93a-c3a3-4110-9057-9fd7aeae693c:image.png)

### 1. 코드 컴파일 및 실행

- 브라우저 기반 코드 에디터 제공
- Docker 컨테이너 기반 격리 실행 환경
- Redis Queue를 활용한 비동기 처리 구조
- 실시간 실행 결과 반환

### 2. 실시간 화상 강의

- WebRTC 기반 양방향 화상 통신
- LiveKit(SFU) 서버를 통한 미디어 스트리밍
- API 서버와 미디어 서버 분리로 네트워크 병목 제거
- 안정적인 HD 화질 강의 환경

### 3. 실시간 코드 공유

- WebSocket(STOMP) 기반 코드 동기화
- 학생 코드 변경 사항 실시간 브로드캐스팅
- 강사의 즉각적인 코드 리뷰 가능
- 자동 저장 구조로 데이터 유실 방지

### 4. 마이페이지

- 사용자 프로필 관리
- 수강/개설 강의 대시보드
- 학습 기록 조회
- 프로필 이미지 S3 저장

### 5. 관리자 시스템

- RBAC(Role-Based Access Control) 기반 접근 제어
- 사용자/강의 대량 등록 (트랜잭션 처리)
- 시스템 상태 모니터링
- 활동 지표 대시보드

---

## 시스템 아키텍처

### 설계 목표

1. **작업 분리**: 고부하 작업(컴파일)과 일반 웹 요청의 명확한 분리
2. **안정성**: 동시 접속 환경에서도 서비스 중단 없는 안정적 운영
3. **보안**: 사용자 코드 실행에 대한 다층 보안 체계
4. **성능**: 실시간 서비스의 네트워크 병목 최소화

### 인프라 구성

**AWS Cloud 기반 VPC 환경**

- **Public Subnet**: API Server, Media Server (LiveKit)
- **Private Subnet**: RDS (MariaDB), Compile Worker
- **Docker 기반** 다중 컨테이너 운영

### 서버 역할 분리

| 서버 | 역할 | 주요 기술 |
| --- | --- | --- |
| **API Server** | - 인증 및 권한 관리- 강의/마이페이지/관리자 API- 컴파일 요청 중개 | Spring Boot, Redis Session |
| **Compile Server** | - 코드 컴파일 및 실행 전담- Docker 컨테이너 내 격리 실행- Redis Queue 기반 작업 처리 | Python, Docker SDK, Redis |
| **Media Server** | - WebRTC 미디어 스트리밍- SFU 기반 실시간 통신 | LiveKit |

---

## ⚙️ 핵심 기술 아키텍처

### 1. 비동기 컴파일 처리 구조

![image.png](attachment:d419e924-f1bb-4d9b-954b-33c0cdb2188c:image.png)

**장점**

- 동시 요청 폭주 시에도 서버 다운 방지
- 작업 대기열 관리로 순차적 안정 처리
- API 서버와 컴파일 서버의 완전한 분리

### 2. 실시간 화상 강의 구조

![image.png](attachment:5af591ac-b50e-4ee3-9247-d7c7e889d210:image.png)

**장점**

- 미디어 트래픽을 API 서버에서 완전히 분리
- 네트워크 병목 및 성능 저하 방지
- SFU 방식으로 효율적인 다자간 통신

### 3. 소프트웨어 아키텍처

![image.png](attachment:85b345e8-9ce0-43b5-a418-0948c0961612:image.png)

---

## 보안 아키텍처

### 1. Docker 격리 실행

- 사용자 코드는 독립된 Docker 컨테이너 내부에서만 실행
- 호스트 OS 및 타 서비스 완전 격리
- 컨테이너 종료 후 즉시 제거

### 2. 코드 블랙리스트 필터링

- Reflection, 시스템 명령 실행, 파일 접근 코드 차단
- 실행 전 정적 분석으로 위험 코드 사전 차단
- 주요 차단 대상: `Runtime.getRuntime()`, `ProcessBuilder`, `File` 클래스 등

### 3. 리소스 제한

- **실행 시간 제한**: 무한 루프 방지
- **메모리 제한**: 과도한 메모리 사용 차단
- **CPU 제한**: CPU 점유율 제어

---

## 데이터 관리

### Database (AWS RDS - MariaDB)

- 사용자, 강의, 수강 정보 저장
- Private Subnet 배치로 보안 강화
- 트랜잭션 기반 데이터 일관성 보장

### AWS S3

- 프로필 이미지 저장
- 소스 코드 파일 업로드/다운로드
- 비정형 데이터 영구 보관

### Redis

- 세션 관리 (Session Store)
- 컴파일 작업 큐 (Message Queue)
- 캐싱 레이어

---

## 주요 데이터 흐름

### 일반 요청

`Client → API Server → DB / Redis(Session) → Response`

### 코드 실행

`Client → API Server → Redis Queue → Compile Worker 
→ Docker 실행 → 결과 반환 → Client`

### 화상 강의

`Client ↔ LiveKit Server (미디어 스트리밍)
Client → API Server (인증/토큰 발급)`

---

## 버전 히스토리

| Version | 주요 변경 사항 | Date |
| --- | --- | --- |
| 0.1.0 | 아키텍처 초기 설계 | 2025-11-30 |
| 0.5.0 | Compile Server 분리, Docker 구조 설계 | 2025-12-03 |
| 0.8.0 | AWS 인프라 확정, Redis 분리, LiveKit 연동 | 2025-12-09 |
| 0.9.0 | 보안 아키텍처 고도화, 예외 처리 통일 | 2025-12-12 |
| 1.0.0 | 최종 아키텍처 확정 | 2025-12-16 |

---

## 기술 스택

### Backend

- Spring Boot
- Spring Security (JWT)
- WebSocket (STOMP)
- JPA
- MariaDB

### Frontend

- React
- React Router
- STOMP.js (WebSocket)
- Axios
- Tailwind CSS?/SCSS?/CSS?

### 배포

- Backend: AWS EC2
- Frontend: Vercel
- DB: AWS RDS
