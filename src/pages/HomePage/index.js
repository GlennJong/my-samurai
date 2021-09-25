import React from 'react';
import styled from 'styled-components';
import HeadingSection from './HeadingSection';
import IntroSection from './IntroSection';
import NewsSection from './NewsSection';
import StorySection from './StorySection';
import GallerySection from './GallerySection';
import CardSection from './CardSection';
import PurchaseSection from './PurchaseSection';
import DescriptionSection from './DescriptionSection';
import AboutSection from './AboutSection';
import CartButton from '../../components/CartButton';
import { _w } from '../../utils/wordingSystem';

const HomePage = () => {
  const wording = _w('homepage');
  
  return (
    <Root>
      <HeadingSection id="heading" />
      <PurchaseSection wording={wording.purchase} />
      {/*<IntroSection id="intro" wording={wording.intro} />*/}
      <NewsSection id="news1" wording={wording.news1} />
      <NewsSection id="news2" wording={wording.news2} />
      <NewsSection id="news3" wording={wording.news3} />
      <StorySection id="story" wording={wording.story} />
      <GallerySection id="gallery" wording={wording.gallery} />
      <CardSection id="card" wording={wording.card} />
      <DescriptionSection id="description" wording={wording.description} />
      <AboutSection id="about" wording={wording.about} />
      <CartButton />
    </Root>
  )
}

const Root = styled.div``

export default HomePage;