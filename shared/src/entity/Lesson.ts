interface Lesson {
    _id?: string,
    // ID
    id?: string;
    // 차시 이름
    title: string;
    // 차시 설명
    description: string;
    // 차시 시간 (밀리초)
    duration: number;
    // 프론트가 준 콘텐츠 JSON 스트링화
    content: string;
    // 차시 영상 URL
    videoUrl: string;
    // 차시 업로드 시각
    uploadedAt: Date;
}

export default Lesson;
