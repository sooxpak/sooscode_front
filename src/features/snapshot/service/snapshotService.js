import { api } from '@/services/api.js';

/**
 * 스냅샷 기능 사용  API 정의 상수
 */
const SNAPSHOT_ENDPOINTS = {
    CREATE: `/api/snapshot/`,
    UPDATE: `/api/snapshot/update`,
    READ: `/api/snapshot/read`,
    READ_BY_TITLE: `/api/snapshot/read/title`,
    READ_BY_CONTENT: `/api/snapshot/read/content`,
    READ_BY_DATE: `/api/snapshot/read/date`,
    READ_BY_TITLE_DATE: `/api/snapshot/read/title/date`,
    READ_BY_CONTENT_DATE: `/api/snapshot/read/content/date`,
    READ_ONLY_TITLE_DATE: `/api/snapshot/read/onlytitle/date`
};

/**
 * 스냅샷 관련 API 호출을 전담하는 서비스 객체
 */
export const snapshotService = {

    /**
     * 새로운 스냅샷을 서버에 저장합니다.
     * [POST] /api/snapshot/
     *
     * @param {Object} data - 저장할 스냅샷 정보 (classId, title, content)
     * @returns {Promise<string>} 서버 응답 메시지
     */
    create: async (data) => {
        // 정의된 생성 주소로 POST 요청을 보냅니다. body에 data 객체를 담습니다.
        const { data: responseData } = await api.post(SNAPSHOT_ENDPOINTS.CREATE, data);
        // 서버로부터 받은 응답 데이터를 반환합니다.
        return responseData;
    },
    /**
     * 기존 스냅샷 수정
     * [POST] /api/snapshot/update
     *
     * @param {number} snapshotId - 수정할 스냅샷의 고유 ID
     * @param {Object} data - 수정할 내용 (title, content)
     * @returns {Promise<string>} 서버 응답 메시지
     */
    update: async (snapshotId, data) => {
        // 정의된 수정 주소로 POST 요청을 보냅니다. 쿼리 파라미터로 snapshotId를 전달합니다.
        const { data: responseData } = await api.post(SNAPSHOT_ENDPOINTS.UPDATE, data, {
            params: {
                snapshotId: snapshotId
            }
        });
        // 서버로부터 받은 응답 데이터를 반환합니다.
        return responseData;
    },
    /**
     * 특정 클래스의 스냅샷 목록을 페이지 단위로 조회
     * [GET] /api/snapshot/read
     *
     * @param {number} classId - 조회할 클래스 ID
     * @param {number} page - 페이지 번호 (기본값 0)
     * @param {number} size - 페이지당 데이터 개수 (기본값 3)
     * @returns {Promise<Object>} 페이징된 스냅샷 목록 데이터 (Page<SnapShotResponse>)
     */
    getAll: async (classId, page = 0, size = 3) => {
        // 정의된 조회 주소로 GET 요청을 보냅니다. 쿼리 파라미터로 검색 조건을 전달
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ, {
            params: {
                classId: classId,
                page: page,
                size: size
            }
        });
        // 서버로부터 받은 응답 데이터를 반환
        return responseData;
    },
    /**
     * 제목으로 스냅샷을 검색
     * [GET] /api/snapshot/read/title
     *
     * @param {number} classId - 클래스 ID
     * @param {string} title - 검색할 제목 키워드
     * @returns {Promise<Array>} 검색된 스냅샷 리스트 (List<SnapShotResponse>)
     */
    searchByTitle: async (classId, title) => {
        // GET 요청
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ_BY_TITLE, {
            params: {
                classId: classId,
                title: title
            }
        });
        // 서버로부터 받은 응답 반환
        return responseData;
    },
    /**
     * 내용으로 스냅샷을 검색
     * [GET] /api/snapshot/read/content
     *
     * @param {number} classId - 클래스 ID
     * @param {string} content - 검색할 내용 키워드
     * @returns {Promise<Array>} 검색된 스냅샷 리스트
     */
    searchByContent: async (classId, content) => {
        // GET 요청
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ_BY_CONTENT, {
            params: {
                classId: classId,
                content: content
            }
        });
        // 서버로부터 받은 응답 데이터 반환
        return responseData;
    },
    /**
     * 특정 날짜의 스냅샷을 검색
     * [GET] /api/snapshot/read/date
     *
     * @param {number} classId - 클래스 ID
     * @param {string} day - 검색할 날짜 (형식: "YYYY-MM-DD")
     * @returns {Promise<Array>} 검색된 스냅샷 리스트
     */
    searchByDate: async (classId, day) => {
        //GET 요청
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ_BY_DATE, {
            params: {
                classId: classId,
                day: day
            }
        });
        // 서버로부터 받은 응답 데이터를 반환
        return responseData;
    },
    /**
     * 제목과 날짜로 스냅샷을 검색
     * [GET] /api/snapshot/read/title/date
     *
     * @param {number} classId - 클래스 ID
     * @param {string} title - 검색할 제목
     * @param {string} day - 검색할 날짜
     * @returns {Promise<Array>} 검색된 스냅샷 리스트
     */
    searchByTitleAndDate: async (classId, title, day) => {
        //  GET 요청
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ_BY_TITLE_DATE, {
            params: {
                classId: classId,
                title: title,
                day: day
            }
        });
        // 서버로부터 받은 응답 데이터를 반환
        return responseData;
    },

    /**
     * 내용과 날짜로 스냅샷을 검색
     * [GET] /api/snapshot/read/content/date
     *
     * @param {number} classId - 클래스 ID
     * @param {string} content - 검색할 내용
     * @param {string} day - 검색할 날짜
     * @returns {Promise<Array>} 검색된 스냅샷 리스트
     */
    searchByContentAndDate: async (classId, content, day) => {
        // GET 요청
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ_BY_CONTENT_DATE, {
            params: {
                classId: classId,
                content: content,
                day: day
            }
        });
        // 서버로부터 받은 응답 데이터를 반환
        return responseData;
    },

    /**
     * 특정 날짜의 스냅샷 제목만 조회
     * [GET] /api/snapshot/read/onlytitle/date
     *
     * @param {number} classId - 클래스 ID
     * @param {string} day - 검색할 날짜
     * @returns {Promise<Array>} 스냅샷 제목 리스트 (List<SnapshotTitleResponse>)
     */
    searchOnlyTitleByDate: async (classId, day) => {
        //  GET 요청
        const { data: responseData } = await api.get(SNAPSHOT_ENDPOINTS.READ_ONLY_TITLE_DATE, {
            params: {
                classId: classId,
                day: day
            }
        });
        // 서버로부터 받은 응답 데이터를 반환
        return responseData;
    }
};