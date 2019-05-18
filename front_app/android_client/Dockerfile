FROM openjdk:8

USER root

ENV ANDROID_HOME /opt/android-sdk-linux

ENV SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip" \
    ANDROID_HOME="/usr/local/android-sdk" \
    ANDROID_VERSION=26 \
    ANDROID_BUILD_TOOLS_VERSION=26.0.2

RUN mkdir -p ${ANDROID_HOME} && \
    cd ${ANDROID_HOME} && \
    wget -q https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip -O android_tools.zip && \
    unzip android_tools.zip && \
    rm android_tools.zip \
    && yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

# Install Android Build Tool and Libraries
RUN $ANDROID_HOME/tools/bin/sdkmanager --update
RUN $ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "platform-tools"

# Install Build Essentials

RUN apt-get update && apt-get install build-essential -y && apt-get install file -y && apt-get install apt-utils -y

RUN mkdir -p /usr/src/app/webapp/

COPY ./ /usr/src/app/webapp/

WORKDIR /usr/src/app/webapp/

RUN ./gradlew clean
RUN ./gradlew assembleRelease

CMD ["cp", "/usr/src/app/webapp/app/build/outputs/apk/release/app-release.apk", "/app/webapp/client.apk"]

# Client APK : "/usr/src/app/webapp/app/build/outputs/apk/release/app-release.apk"